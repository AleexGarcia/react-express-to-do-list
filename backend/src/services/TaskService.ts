import { DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import Task from "../entity/Task";
import User from "../entity/User";
import { TaskRepository } from "../repositories/TaskRepository";
import { UserRepository } from "../repositories/UserRepository";

export class TaskService {
  taskRepository: TaskRepository;
  userRepository: UserRepository;
  constructor(
    taskRepository = new TaskRepository(AppDataSource.manager),
    userRepository = new UserRepository(AppDataSource.manager)
  ) {
    this.taskRepository = taskRepository;
    this.userRepository = userRepository;
  }
  createTask = async (title: string, userId: string) => {
    const user: User | null = await this.userRepository.getUserById(userId);
    if (!user) throw new Error("id invalid");

    let task = new Task(title, user);
    const taskResponse = await this.taskRepository.createTask(task);

    return taskResponse;
  };

  getTask = async (id: string): Promise<Task | null> => {
    return this.taskRepository.getTask(id);
  };

  getAllTasks = async (userId: string): Promise<Task[]> => {
    return await this.taskRepository.getAllTasks(userId);
  };

  updateTask = async (id: string, userId: string): Promise<Task | null> => {
    const user = await this.userRepository.getUserById(userId);
    if (user) {
      const task = await this.taskRepository.getTask(id);
      if (task) {
        task.status = true;
        return await this.taskRepository.updateTask(task);
      }
      throw new Error("invalid id task");
    }
    throw new Error("invalid userId");
  };

  deleteTask = async (id: string, userId: string): Promise<DeleteResult> => {
    const user = await this.userRepository.getUserById(userId);

    if (user) {
      return this.taskRepository.deleteTask(id);
    } else {
      throw new Error("invalid userId");
    }
  };

  deleteCompletedTasks = async (userId: string) => {
    const user = await this.userRepository.getUserById(userId);
    if (user) {
      return this.taskRepository.deleteCompletedTasks(userId);
    } else {
      throw new Error("invalid userId");
    }
  };
}
