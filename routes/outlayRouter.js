import { Router } from 'express';

import OutlayController from '../controllers/outlayController.js';

import { authHandler } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/delete', OutlayController.delete);
router.post('/get-all-outlays', authHandler, OutlayController.getAll);

export default router;
