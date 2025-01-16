import { Schema, model } from 'mongoose';

const eventSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true, maxLength: 100 },
    date: { type: Date, required: true },
    time: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
    category: {
      type: String,
      required: true,
      enum: ['meeting', 'birthday', 'workshop', 'conference', 'webinar', 'party']
    },
    description: { type: String, required: true, maxLength: 1000 },
  },
  { timestamps: true, versionKey: false }
);

export const EventsCollection = model('events', eventSchema);
export { eventSchema };
