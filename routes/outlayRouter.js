import { Router } from 'express';
import OutlayController from '../controllers/outlayController.js';

const router = new Router();

router.post('/delete', OutlayController.delete)
router.get('/get-all-outlays', OutlayController.getAll) 

export default router;