import Joi from "joi";

export const createUpdateCompanySchame = Joi.object({
  name: Joi.string().min(2).required()
})