import Joi from "joi";

export const createUpdateStaffSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  ownerId: Joi.string().required(),
  storeId: Joi.string().required(),
  status:Joi.string().valid("active", "inactive").required().default("active")
})