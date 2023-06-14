import { Router } from 'express';
import userRouter from './userRouter.js';
import categoriesRouter from './categoriesRouter.js';
import outlayRouter from './outlayRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/categories', categoriesRouter);
router.use('/outlays', outlayRouter);

export default router;
