import Joi from 'joi';

export const offerSchema = Joi.object({
  petName: Joi.string().required(),
  age: Joi.number().required(),
  description: Joi.string().required(),
  petType: Joi.string().required(),
  localization: Joi.string().required(),
  breeds: Joi.string().required(),
  shelterId: Joi.number().required(),
  image: Joi.binary().optional(), 
  imageName: Joi.string().optional(),
});

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user', 'shelter').required(),
  });