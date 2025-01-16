import Joi from 'joi';

// Define the Joi validation schema
export const eventJoiSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().max(100).required(),
  date: Joi.date().required(),
  time: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
  category: Joi.string().valid('meeting', 'birthday', 'workshop', 'conference', 'webinar', 'party').required(),
  description: Joi.string().max(1000).required(),
});
