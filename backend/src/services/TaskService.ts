import { DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source"
import Task from "../entity/Task";
import User from "../entity/User";
import { TaskRepository } from "../repositories/TaskRepository";
import { UserRepository } from "../repositories/UserRepository";

export class TaskService {
  taskRepository: TaskRepository
  userRepository: UserRepository
  constructor(
    taskRepository = new TaskRepository(AppDataSource.manager),
    userRepository = new UserRepository(AppDataSource.manager)
  ) {
    this.taskRepository = taskRepository;
    this.userRepository = userRepository;
  }
  createTask = async (title: string, userId: string) => {
    const user: User | null = await this.userRepository.getUserById(userId);
    if (!user) throw new Error('id invalid');

    const task = new Task(title, user);

    await this.taskRepository.createTask(task);
    return this.addTaskToUser(task, user);
  }

  getTask = async (id: string): Promise<Task | null> => {
    return this.taskRepository.getTask(id);
  }

  getAllTasks = async (userId: string): Promise<Task[]> => {
    return await this.taskRepository.getAllTasks(userId);
  }

  updateTask = async (id: string, title: string, status: boolean, userId: string): Promise<Task | null> => {
    const task = await this.taskRepository.getTask(id);
    const user = await this.userRepository.getUserById(userId);

    if (task && user) {
      task.status = status;
      task.title = title;
      await this.updateTaskToUser(user, task);
      return await this.taskRepository.updateTask(task);
    }
    throw new Error('Invalid id / userId');
  }
  deleteTask = async (id: string, userId: string): Promise<DeleteResult> => {
    const [user, deleteResult] = await Promise.all([
      this.userRepository.getUserById(userId),
      this.taskRepository.deleteTask(id)
    ])


    if (deleteResult.affected === 1 && user) {
      this.deleteTaskToUser(user, id);
    }
    return deleteResult;
  }
  private addTaskToUser = async (task: Task, user: User): Promise<User> => {

    if (!user.tasks) user.tasks = [];

    user.tasks.push(task);

    return this.userRepository.addTaskToUser(user)
  }
  private updateTaskToUser = async (user: User, task: Task) => {
    if (!user.tasks) throw new Error('Nenhum elemento adicionado');
    const indexTask = user.tasks.findIndex(arrayTask => arrayTask.id === task.id);
    if (indexTask !== -1) {
      user.tasks.splice(indexTask, 1, task);
      return this.userRepository.updateTaskToUser(user);
    }
    throw new Error('Invalid task Id');
  }
  private deleteTaskToUser = async (user: User, taskId: string) => {
    if (!user.tasks) throw new Error('Nenhum elemento adicionado');

    const indexTask = user.tasks.findIndex(arrayTask => arrayTask.id === taskId);
    if (indexTask !== -1) {
      user.tasks.splice(indexTask, 1);
      return this.userRepository.deleteTaskToUser(user);
    }
    throw new Error('Invalid task Id');
  }
}