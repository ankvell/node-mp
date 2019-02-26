const Joi = require('joi')

const createSchema = Joi.object().keys({
  id: [Joi.string(), Joi.number()],
  city: Joi.string().alphanum().min(3).max(60).required(),
  venue: Joi.string().alphanum().min(3).max(60).required()
})

const updateSchema = Joi.object().keys({
  city: Joi.string().alphanum().min(3).max(60).required(),
  venue: Joi.string().alphanum().min(3).max(60).required()
})

module.exports = {
  createSchema,
  updateSchema
} 