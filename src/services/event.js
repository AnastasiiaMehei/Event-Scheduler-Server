import {EventsCollection}  from '../db/models/event.js';

export async function addEvent(data) {
  return await EventsCollection.create(data);
}

export async function updateEvent(eventId, data) {
  return await EventsCollection.findOneAndUpdate(
    { _id: eventId },
    data,
    {
      new: true,
    }
  );
}

export async function deleteEvent(eventId) {
  return await EventsCollection.findOneAndDelete({ _id: eventId });
}

export async function getEvent(eventId) {
  return await EventsCollection.findOne({ _id: eventId });
}

export async function getAllEvents() {
  return await EventsCollection.find({});
}
