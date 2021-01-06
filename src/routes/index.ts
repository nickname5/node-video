import express from 'express';
import { UserController } from 'controller/UserController';
const router = express.Router();

router.post('/login', UserController.login);

export default router;
