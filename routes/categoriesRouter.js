import { Router } from 'express';

import { roleHandler } from '../middleware/checkRoleMiddleweare.js';
import { authHandler } from '../middleware/authMiddleware.js';

import CategoryController from '../controllers/categoryController.js';

const router = new Router();

router.post('/create', CategoryController.create);
router.post('/delete', CategoryController.delete);
router.post('/get-all', authHandler, CategoryController.getAll); // , roleHandler('USER')
router.post('/get-all-categories', authHandler, CategoryController.getAllCategories);

export default router;
