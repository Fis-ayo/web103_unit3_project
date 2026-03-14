import express from 'express';
import spaceController from '../controller/virtualSpace.js';

const router = express.Router();

router.get('/events', spaceController.getEvents);
router.get('/locations', spaceController.getLocations);
router.get('/:locationId', spaceController.getLocation);

export default router;