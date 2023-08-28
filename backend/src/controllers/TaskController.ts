import { Request, Response } from "express"
import { TaskService } from "../services/TaskService";

export class TaskController {
    taskService: TaskService

    constructor(
        taskService = new TaskService(),
    ) {
        this.taskService = taskService;
    }

    createTask = (request: Request, response: Response): Response => {
        const task = request.body;

        if (!task.title)
            return response.status(400).json({ message: 'Bad request!' });
        this.taskService.createTask(task.title, task.userId);

        return response.status(201).json({ message: 'Task criada' });
    }

    getTask = async (request: Request, response: Response): Promise<Response> => {
        const id = request.params.id;
        const task = await this.taskService.getTask(id);
        if (!task)
            return response.status(400).json({ message: 'Invalid ID' });

        return response.status(200).json(task)
    }

    getAllTasks = async (request: Request, response: Response): Promise<Response> => {
        const userId = request.params.userId;
        let tasks = this.taskService.getAllTasks(userId);
        return response.status(200).json(tasks)
    }

    updateTask = (request: Request, response: Response): Response => {
        const id = request.params.id;
        const userId = request.params.userId;
        const task = request.body;
        try {
            this.taskService.updateTask(id, task.title, task.status, userId);
            return response.status(200).json({ message: 'Task atualizada' });
        } catch {
            return response.status(400).json({ message: 'Invalid id' })
        }

    }

    deleteTask = async (request: Request, response: Response) => {
        const id = request.params.id;
        const userId = request.params.userId;
        const deleteResult = await this.taskService.deleteTask(id,userId);
        if (deleteResult.affected === 1) {
            return response.status(200).json({ message: 'task deletada' })
        }
        return response.status(400).json({ message: 'Invalid id' })
    }


}