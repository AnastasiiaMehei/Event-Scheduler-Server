import { model, Schema } from 'mongoose';

const eventSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    eventId: { type: String, required: false, unique: true }, // Use eventId for UUID
    name: { type: String, required: true, maxlength: 100 },
    date: { type: Date, required: true },
    time: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
    category: {
      type: String,
      enum: ['meeting', 'birthday', 'workshop', 'conference', 'webinar', 'party'],
      required: true,
    },
    description: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true, versionKey: false },
);

export const EventsCollection = model('events', eventSchema);
