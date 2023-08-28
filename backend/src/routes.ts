import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { verifyAuth } from "./midleware/verifyAuth";
import { TaskController } from "./controllers/TaskController";

export const router = Router();

const userController = new UserController();
const taskController = new TaskController();

//auth
router.post('/auth/signup', userController.createUser);
router.get('/auth/login', userController.generateAuthToken);
//crud task
router.post('/task', verifyAuth, taskController.createTask);
router.get('/task/:id', verifyAuth, taskController.getTask);
router.delete('/task/:id/:userId', verifyAuth, taskController.deleteTask);
router.patch('/task/:id/:userId', verifyAuth, taskController.updateTask);
//get all
router.get('/task/:userId');







