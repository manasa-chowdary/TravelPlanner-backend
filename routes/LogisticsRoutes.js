import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addLogistics,
  getLogistics,
  deleteLogistics,
} from '../controllers/logisticsController.js';

const router = express.Router();

router.post('/:tripId', protect, addLogistics);
router.get('/:tripId', protect, getLogistics);
router.delete('/:logisticsId', protect, deleteLogistics);

export default router;
