const Joi = require('joi')

const createSchema = Joi.object().keys({
  id: [Joi.string(), Joi.number()],
  event: Joi.string().alphanum().min(3).max(60).required()
})

const updateSchema = Joi.object().keys({
  event: Joi.string().alphanum().min(3).max(60).required()
})

module.exports = {
  createSchema,
  updateSchema
} 