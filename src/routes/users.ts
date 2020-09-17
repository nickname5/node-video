import express from 'express';
import { UserController } from 'controller/UserController';
const router = express.Router();

/* GET users listing. */
router.get('/', UserController.getUserList);

router.get('/:id', UserController.getUser);

export default router;
