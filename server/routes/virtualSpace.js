import express from 'express';
import spaceController from '../controller/virtualSpace.js';

const router = express.Router();

router.get('/events', spaceController.getEvents);
router.get('/locations', spaceController.getLocations);
router.get('/location/:locationId', spaceController.getLocation);
router.get('/location/:locationId/events', spaceController.getEventsByLocationId);

export default router;