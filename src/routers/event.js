import { Router, json } from 'express';
import {
  addEventController,
  updateEventController,
  deleteEventController,
  getEventController,
  getAllEventsController,
} from '../controllers/event.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
const eventsRouter = Router();
const jsonParser = json();

// Route to fetch all events
eventsRouter.get('/events',  ctrlWrapper(getAllEventsController));

// Route to get a specific event
eventsRouter.get('/events/:eventId', ctrlWrapper(getEventController));

// Route to create a new event
eventsRouter.post('/events', jsonParser, ctrlWrapper(addEventController));

// Route to update an event
eventsRouter.put('/events/:eventId', jsonParser,  ctrlWrapper(updateEventController));

// Route to delete an event
eventsRouter.delete('/events/:eventId', ctrlWrapper(deleteEventController));

export default eventsRouter;
