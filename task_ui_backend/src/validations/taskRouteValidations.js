import Joi from "joi";

export const createTagValidation = Joi.object().keys({
  name: Joi.string().required().min(3).max(20),
  description: Joi.string().required().min(20).max(300),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  dueDate: Joi.date().required(),
  isComplete: Joi.boolean()
});

