import Joi from "joi";

export const createPlanSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow("", null),
  maxStores: Joi.number().integer().min(1).required(),
  features: Joi.array().items(Joi.string().trim()).default([]),
  durations: Joi.array()
    .items(Joi.number().integer().min(1))
    .min(1)
    .required(),
  pricing: Joi.object()
    .pattern(
      Joi.string(), // dynamic keys like "1", "2", "3"
      Joi.object({
        total: Joi.number().min(0).required()
      })
    )
    .required(),
  isRecommended: Joi.boolean().default(false),
  isActive: Joi.boolean().default(true)
});


export const updatePlanSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().allow("", null),
  maxStores: Joi.number().integer().min(1),
  features: Joi.array().items(Joi.string().trim()),
  durations: Joi.array().items(Joi.number().integer().min(1)),
  pricing: Joi.object().pattern(
    Joi.string(), // dynamic keys like "1", "2"
    Joi.object({
      total: Joi.number().min(0).required()
    })
  ),
  isRecommended: Joi.boolean(),
  isActive: Joi.boolean()
})
  .min(1) // ⚡ at least one field must be sent
  .messages({
    "object.min": "At least one field is required to update"
  });