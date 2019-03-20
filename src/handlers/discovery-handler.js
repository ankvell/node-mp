
const Joi = require('joi')
const { createSchema, updateSchema }  = require('../validations/discovery.schema')
const ObjectID = require('mongodb').ObjectID

const discoveryHandler = (db) => {
  const collection = db.collection('discoveries')

  const create = (req, res) => {
    Joi.validate(req.body, createSchema, (error, value) => {
      if (error)
        res.status(422).send({ error: error.message || 'Unprocessable Entity' })
        return
    })
  
    collection
      .insert(req.body)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(err => console.log(err))
  }

  const findAll = (req, res) => {
    collection.find({}).toArray()
      .then((data) => res.status(200).json(data))
      .catch(err => console.log(err))
  }

  const findById = (req, res) => {
    collection.findOne({_id: new ObjectID(req.params)})
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
  
    collection.findOneAndUpdate(
      {_id: new ObjectID(id)},
      {$set: update},
      {returnOriginal: false})
      .then((data) => res.status(200).json(data.value))
      .catch(err => console.log(err))
  }

  const deleteById = (req, res) => {
    collection.remove({_id: new ObjectID(req.params)}, true)
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

module.exports = discoveryHandler