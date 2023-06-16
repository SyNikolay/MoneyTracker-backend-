import { Router } from 'express';
import { authHandler } from '../middleware/authMiddleware.js';
import UserController from '../controllers/userController.js';

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/auth', authHandler, UserController.auth);
router.post('/ballance', authHandler, UserController.getBallance);
router.post('/set-ballance', authHandler, UserController.setBallance);

export default router;
