import express from 'express';
import { getUserLocation, updateUserLocation } from '../controller/locationController';

const locationRoute = express.Router();

locationRoute.put('', updateUserLocation);
locationRoute.get('', getUserLocation);

export default locationRoute;