import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createItineraryDay,
  getItinerary,
  addActivity,
  editActivity,
  deleteActivity,
} from '../controllers/itineraryController.js';

const router = express.Router();

router.post('/:tripId/day', protect, createItineraryDay);
router.get('/:tripId', protect, getItinerary);
router.post('/:itineraryId/activity', protect, addActivity);
router.put('/:itineraryId/activity/:activityId', protect, editActivity);
router.delete('/:itineraryId/activity/:activityId', protect, deleteActivity);

export default router;
