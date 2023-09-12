import { Request, Response } from "express"
import { TaskService } from "../services/TaskService";

export class TaskController {
    taskService: TaskService

    constructor(
        taskService = new TaskService(),
    ) {
        this.taskService = taskService;
    }

    createTask = async (request: Request, response: Response): Promise<Response> => {
        const { title, userId } = request.body;

        if (!title || !userId)
            return response.status(400).json({ message: 'Bad request' });

        const task = await this.taskService.createTask(title, userId);

        return response.status(201).json({
            id: task.id,
            title: task.title,
            status: task.status
        });
    }

    getTask = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id;
        const task = await this.taskService.getTask(id);
        if (!task)
            return response.status(404).json({ message: 'Not Found' });

        return response.status(200).json(task)
    }

    getAllTasks = async (request: Request, response: Response): Promise<Response> => {
        const { userId } = request.body;
        let resDB = await this.taskService.getAllTasks(userId);
        if (!resDB) return response.status(404).json({ message: 'Not Found' })
        const tasks = resDB.map(task => {
            return {
                id: task.id,
                title: task.title,
                status: task.status
            }
        })
        return response.status(200).json(tasks);
    }

    updateTask = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id;
        const { userId } = request.body;
        
        try {
            const task = await this.taskService.updateTask(id, userId);
            return response.status(200).json({
               id: task?.id,
               title: task?.title,
                status: task?.status
            });
        } catch {
            return response.status(400).json({ message: 'Not Found' })
        }

    }

    deleteTask = async (request: Request, response: Response) => {
        const id = request.params.id;
        const { userId } = request.body;
     
        const deleteResult = await this.taskService.deleteTask(id, userId);
        if (deleteResult.affected === 1) {
            return response.status(204).json({ message: 'No Content' })
        }
        return response.status(400).json({ message: 'Not Found' })
    }

    deleteAllTasks =async (request: Request, response: Response) => {
        
    }

}