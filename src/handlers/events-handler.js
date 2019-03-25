const Joi = require('joi')
const { createSchema, updateSchema } = require('../validations/event.schema')
const { mongooseEventSchema } = require('../validations/model')

const eventHandler = () => {

  const create = (req, res) => {
    Joi.validate(req.body, createSchema, (error, value) => {
      if (error)
        res.status(422).send({ error: error.message || 'Unprocessable Entity' })
        return
    })

    mongooseEventSchema
      .create(req.body)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(err => console.log(err))
  }

  const findAll = (req, res) => {
    mongooseEventSchema.find({}).then((data) => res.status(200).json(data))
  }

  const findById = (req, res) => {
    mongooseEventSchema.findById({ _id: req.params })
      .then((data) => res.status(200).json(data))
      .catch(err => console.log(err))
  }

  const updateById = (req, res) => {
    const {id, ...update} = req.body

    Joi.validate(req.body, updateSchema, (error, value) => {
      if (error)
        res.status(422).send({ error: error.message || 'Unprocessable Entity' })
        return
    })
  
    mongooseEventSchema.findByIdAndUpdate(
      {_id: id},
      {$set: update},
      {new: true})
      .then((data) => res.status(200).json(data.value))
      .catch(err => console.log(err))
  }

  const deleteById = (req, res) => {
    mongooseEventSchema.findByIdAndRemove({ _id: req.params })
    .then(() =>  res.status(200).send(req.params))
    .catch(err => console.log(err))
  }

  return {
    create,
    findAll,
    findById,
    updateById,
    deleteById
  }
}

module.exports = eventHandler
