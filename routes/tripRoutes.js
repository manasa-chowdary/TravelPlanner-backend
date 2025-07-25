import express from 'express';
import { createTrip, getMyTrips, editTrip, deleteTrip, updateBudget, addExpense, deleteExpense, addParticipant, removeParticipant } from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createtrip', protect, createTrip);
router.get('/mytrips', protect, getMyTrips);
router.put('/:id', protect, editTrip);
router.delete('/:id', protect, deleteTrip);
router.put('/budget/:id', protect, updateBudget);
router.post('/expense/:id', protect, addExpense);
router.delete('/expense/:id/:expenseId', protect, deleteExpense);
router.post('/participant/:id', protect, addParticipant);
router.delete('/participant/:id', protect, removeParticipant);

export default router;
