import { Router, Request, Response } from "express";

export const router = Router();

//auth
router.post('auth/signup');
router.get('auth/login');
//crud task
router.post('/task/:id');
router.get('/task/:id');
router.delete('/task/:id');
router.patch('/task/:id');
//get all
router.get('/task');
