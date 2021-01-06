import express from 'express';
import { UserController } from 'controller/UserController';
import { authenticate } from 'middleware/authenticate';
const router = express.Router();

/* GET users listing. */
router.get('/', authenticate, UserController.getUserList);

router.get('/:id', UserController.getFullUserData);

export default router;
