import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { verifyAuth } from "./midleware/verifyAuth";
import { TaskController } from "./controllers/TaskController";


export const router = Router();


const userController = new UserController();
const taskController = new TaskController();

//auth
router.post('/auth/signup', userController.createUser);
router.post('/auth/login', userController.generateAuthToken);
router.get('/auth/verify', verifyAuth,userController.verifyToken);
//crud task
router.post('/task', verifyAuth, taskController.createTask);
router.get('/task/:id', verifyAuth, taskController.getTask);
router.delete('/task/:id', verifyAuth, taskController.deleteTask);
router.patch('/task/:id', verifyAuth, taskController.updateTask);
//get all
router.get('/tasks', verifyAuth,taskController.getAllTasks);
router.delete('/tasks',verifyAuth,taskController.deleteCompletedTasks)






