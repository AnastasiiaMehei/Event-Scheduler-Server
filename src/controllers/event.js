import { addEvent, updateEvent, deleteEvent, getEvent, getAllEvents } from '../services/events.js';
import createHttpError from 'http-errors';import { eventSchema } from '../validation.js'; 
export async function addEventController(req, res, next) {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    return next(createHttpError(400, error.details[0].message));
  }

  const data = {
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    category: req.body.category,
    description: req.body.description,
    userId: req.user._id,
  };

  await addEvent(data);

  res.status(200).send({
    status: 200,
    message: 'Event added successfully',
    data,
  });
}

export async function updateEventController(req, res, next) {
  const eventId = req.params.eventId;
  const userId = req.user._id;

  const { error } = eventSchema.validate(req.body);
  if (error) {
    return next(createHttpError(400, error.details[0].message));
  }

  const data = {
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    category: req.body.category,
    description: req.body.description,
  };

  const updatedEvent = await updateEvent(eventId, data, userId);

  if (!updatedEvent || updatedEvent.userId.toString() !== userId.toString()) {
    return next(createHttpError(404, 'Not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Event updated successfully',
    data: updatedEvent,
  });
}

export async function deleteEventController(req, res, next) {
  const eventId = req.params.eventId;
  const userId = req.user._id;

  const deletedEvent = await deleteEvent(eventId, userId);

  if (!deletedEvent || deletedEvent.userId.toString() !== userId.toString()) {
    return next(createHttpError(404, 'Not found'));
  }

  res.status(204).end();
}

export async function getEventController(req, res, next) {
  const eventId = req.params.eventId;
  const userId = req.user._id;

  const event = await getEvent(eventId, userId);

  if (!event || event.userId.toString() !== userId.toString()) {
    return next(createHttpError(404, 'Not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Event retrieved successfully',
    data: event,
  });
}

export async function getAllEventsController(req, res, next) {
  const userId = req.user._id;

  const events = await getAllEvents(userId);

  res.status(200).json({
    status: 200,
    message: 'All events retrieved successfully',
    data: events,
  });
}
