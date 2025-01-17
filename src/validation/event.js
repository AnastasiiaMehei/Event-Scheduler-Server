import Joi from 'joi';

// Define the Joi validation schema for creating an event
export const eventCreationSchema = Joi.object({
  name: Joi.string().max(100).required(),
  date: Joi.date().required(),
  time: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
  category: Joi.string().valid('meeting', 'birthday', 'workshop', 'conference', 'webinar', 'party').required(),
  description: Joi.string().max(1000).required(),
});
