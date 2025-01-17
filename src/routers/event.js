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

eventsRouter.get('/events', ctrlWrapper(getAllEventsController));
eventsRouter.get('/events/:eventId', ctrlWrapper(getEventController));
eventsRouter.post('/events', jsonParser, ctrlWrapper(addEventController));
eventsRouter.put('/events/:eventId', jsonParser, ctrlWrapper(updateEventController));
eventsRouter.delete('/events/:eventId', ctrlWrapper(deleteEventController));

export default eventsRouter;
