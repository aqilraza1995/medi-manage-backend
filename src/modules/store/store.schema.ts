import Joi from "joi";

export const createStoreSchema = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.object({
    street: Joi.string().min(3).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    phone: Joi.string().optional()
  }).required(),
  ownerId: Joi.string().required()
})


export const updateStoreSchema = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.object({
    street: Joi.string().min(3).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    phone: Joi.string().optional()
  }).required(),
})