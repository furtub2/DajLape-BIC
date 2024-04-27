import Joi from 'joi';

export const offerSchema = Joi.object({
  image: Joi.string().required(),
  petName: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  description: Joi.string().required(),
  petType: Joi.string().valid('dog', 'cat', 'bird', 'other').required(),
  localization: Joi.string().required(),
  breeds: Joi.string().required(),
  shelterId: Joi.number().integer().required(),
});

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user', 'shelter').required(),
  });