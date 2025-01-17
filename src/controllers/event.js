import { addEvent, updateEvent, deleteEvent, getEvent, getAllEvents } from '../services/event.js';
import createHttpError from 'http-errors';
import { EventsCollection } from '../db/models/event.js'; // Ensure correct import
import { v4 as uuidv4 } from 'uuid'; // Import uuid generator

export async function addEventController(req, res, next) {
  const { error } = EventsCollection.validate(req.body);
  if (error) {
    return next(createHttpError(400, error.details[0].message));
  }

  const data = {
    eventId: uuidv4(), // Generate unique eventId
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    category: req.body.category,
    description: req.body.description,
  };

  const newEvent = await addEvent(data);

  res.status(200).send({
    status: 200,
    message: 'Event added successfully',
    data: newEvent,
  });
}

export async function updateEventController(req, res, next) {
  const eventId = req.params.eventId;

  const { error } = EventsCollection.validate(req.body);
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

  const updatedEvent = await updateEvent(eventId, data);

  if (!updatedEvent) {
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

  const deletedEvent = await deleteEvent(eventId);

  if (!deletedEvent) {
    return next(createHttpError(404, 'Not found'));
  }

  res.status(204).end();
}

export async function getEventController(req, res, next) {
  const eventId = req.params.eventId;

  const event = await getEvent(eventId);

  if (!event) {
    return next(createHttpError(404, 'Not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Event retrieved successfully',
    data: event,
  });
}

export async function getAllEventsController(req, res, next) {
  const events = await getAllEvents();

  res.status(200).json({
    status: 200,
    message: 'All events retrieved successfully',
    data: events,
  });
}
