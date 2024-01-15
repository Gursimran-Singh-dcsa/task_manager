import Joi from "joi";

export const createUserValidation = Joi.object().keys({
  userName: Joi.string().max(20).required(),
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

export const loginUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});
