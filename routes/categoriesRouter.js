import { Router } from 'express';
import { roleHandler } from '../middleware/checkRoleMiddleweare.js';
import CategoryController from '../controllers/categoryController.js';

const router = new Router();

router.post('/create', CategoryController.create);
router.post('/delete', CategoryController.delete);
router.get('/get-all', CategoryController.getAll); // , roleHandler('USER')
router.get('/get-all-categories', CategoryController.getAllCategories);

export default router;
