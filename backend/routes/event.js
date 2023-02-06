import express from 'express';
const router = express.Router();
import { createEvent } from '../controllers/eventController.js';
import protect from '../middleware/authMiddleware.js';

// router.route('/').get(getEvents);
// router.route('/:id').get(getEventById);
// router.routes('/:email').get(getEventsByUser)
router.route('/').post(protect, createEvent);

export default router;