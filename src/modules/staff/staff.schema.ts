import Joi from "joi";

export const createUpdateStaffSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    street: Joi.string().min(3).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
  }).required(),
  // ownerId: Joi.string().required(),
  shopId: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").required().default("active")
})