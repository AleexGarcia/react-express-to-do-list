import { DeleteResult, EntityManager } from "typeorm";
import Task from "../entity/Task";

export class TaskRepository {
  private manager: EntityManager

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  createTask = async (task: Task) => {
    return await this.manager.save(task);
  }

  getTask = async (id: string): Promise<Task | null> => {
    return await this.manager.findOne(Task, {
      where: {
        id: id
      }
    })
  }
  getAllTasks = async (userId: string): Promise<Task[]> => {
    return await this.manager.find(Task, {
      where: {
        user: {
          id: userId
        }
      }
    })
  }
  updateTask = async (task: Task):Promise<Task> => {
    return await this.manager.save(task);
  }

  deleteTask = async (id: string): Promise<DeleteResult> => {
    return await this.manager.delete(Task,{
      where: {
        id: id
      }
    })
  }
}