import Joi from 'joi';

export const eventSchema = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  date: Joi.date().iso().required(),
  time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  category: Joi.string().valid('meeting', 'birthday', 'workshop', 'conference', 'webinar', 'party').required(),
  description: Joi.string().max(50).required(),
});
