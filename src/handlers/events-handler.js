const fs = require('fs')
const uuid = require('uuid/v4')
const Joi = require('joi')
const { createSchema, updateSchema } = require('../validations/event.schema')
const EVENTS = '../../db/events.json'

const create = (req, res) => {
  const itemList = getEventsData()
  const data = { id: uuid(), ...req.body }

  Joi.validate(req.body, createSchema, function (error, value) {
    if (error)
      res.status(422).send({ error: error.message || 'Unprocessable Entity' })
      return
  })

  if (itemList.find(item => item.id === req.body.id)) {
    res.status(409).send({ message: 'Event already exists.' })
  }
  
  itemList.push(data)
  setEventsData(itemList)
  res.setHeader('Content-Type', 'application/json')
  res.status(201).send(JSON.stringify(data))
}

const findAll = (req, res) => {
  const itemList = getEventsData()

  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(itemList))
}

const findById = (req, res) => {
  const itemList = getEventsData()
  const item = itemList.find(item => item.id === req.params.id)

  if (!item) {
    res.status(404).send({ message: 'Event has not been found.' })
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(item))
}

const updateById = (req, res) => {
  let itemList = getEventsData()

  Joi.validate(req.body, updateSchema, function (error, value) {
    if (error)
      res.status(422).send({ error: error.message || 'Unprocessable Entity' })
      return
  })

  if (!itemList.find((item) => item.id === req.params.id)) {
    res.status(404).send({ message : 'Event has not been found.'})
  }
  itemList = itemList.map(item => item.id === req.params.id ? { id: item.id, ...req.body } : item)

  setEventsData(itemList)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(req.body))
}

const deleteById = (req, res) => {
  const itemList = getEventsData()
  const item = itemList.find(elem => elem.id === req.params.id)

  if (item) {
    itemList.splice(itemList.indexOf(item), 1)
    setEventsData(itemList)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send({ message: 'Event has been successfully removed.' })
  } else {
    res.status(404).send({ message: 'Event has not been found.' })
  }
}

const getEventsData = () => {
  const list = fs.readFileSync(`${ __dirname }/${ EVENTS }`, 'utf8')
  return JSON.parse(list)
}

const setEventsData = (list) => {
  return fs.writeFileSync(`${ __dirname }/${ EVENTS }`, JSON.stringify(list))
}

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById
}