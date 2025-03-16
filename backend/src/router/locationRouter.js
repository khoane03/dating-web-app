// src/routes/locationRouter.js
import express from 'express';
import { updateUserLocation, getUserLocation } from '../controllers/locationController.js';

const router = express.Router();

router.put('/users/:userId/location', updateUserLocation);
router.get('/users/:userId/location', getUserLocation);

export default router;