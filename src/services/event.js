import { UsersCollection } from '../db/models/user.js';
import { EventsCollection } from '../db/models/events.js'; // Шлях до вашої моделі подій

export async function userDailyNorm(dailyNorma, userId) {
  return await UsersCollection.findByIdAndUpdate(
    userId,
    { dailyNorma },
    { new: true }
  );
}

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
