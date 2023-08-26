import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AppDataSource } from "./data-source";
import { verifyAuth } from "./midleware/verifyAuth";

export const router = Router();

const userController = new UserController();
//auth

router.post('/auth/signup', userController.createUser);
router.get('/auth/login', userController.generateAuthToken);

//crud task
router.post('/task/:id', verifyAuth,);
router.get('/task/:id', verifyAuth,);
router.delete('/task/:id', verifyAuth,);
router.patch('/task/:id', verifyAuth,);
//get all
router.get('/task');







