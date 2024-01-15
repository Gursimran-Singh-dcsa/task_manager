import Joi from "joi";

export const createTaskValidation = Joi.object().keys({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().required().min(20).max(300),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  dueDate: Joi.date().required(),
  isComplete: Joi.boolean()
});

export const deleteTaskValidation = Joi.object().keys({
  ids: Joi.array().min(1).required()
});
