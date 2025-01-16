import { EventsCollection } from '../db/models/event.js'; // Шлях до вашої моделі подій


export async function addEvent(data) {
  return await EventsCollection.create(data);
}

export function updateEvent(eventId, data, userId) {
  return EventsCollection.findOneAndUpdate(
    { _id: eventId, userId },
    data,
    {
      new: true,
    }
  );
}

export function deleteEvent(eventId, userId) {
  return EventsCollection.findOneAndDelete({ _id: eventId, userId });
}

export async function getEvent(eventId, userId) {
  return await EventsCollection.findOne({ _id: eventId, userId });
}

export async function getAllEvents(userId) {
  return EventsCollection.find({ userId });
}
