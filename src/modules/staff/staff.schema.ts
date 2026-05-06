import Joi from "joi";

export const createUpdateStaffSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).required(),
  email: Joi.string().email().allow("", null),
  address: Joi.object({
    street: Joi.string().min(3).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
  }).required(),
  shopId: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").default("active")
})