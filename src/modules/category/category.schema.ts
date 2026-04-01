import Joi from "joi";

export const createUpdateCategorySchame = Joi.object({
  name: Joi.string().min(2).required()
})