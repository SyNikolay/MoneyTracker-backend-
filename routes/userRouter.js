import { Router } from 'express';
import { authHandler } from '../middleware/authMiddleware.js';
import UserController from '../controllers/userController.js';

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', authHandler, UserController.auth);

export default router;
