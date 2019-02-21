const fs = require('fs')
const uuid = require('uuid/v4')
const DISCOVERY = '../../db/discovery.json'

const create = (req, res) => {
  const itemList = getDiscoveryData()

  if (itemList.find(item => item.id === req.body.id)) {
    res.status(409).send({ message: 'Discovery already exists.' })
  }

  const data = { id: uuid(), ...req.body }
  itemList.push(data)
  setDiscoveryData(itemList)
  res.setHeader('Content-Type', 'application/json')
  res.status(201).send(JSON.stringify(data))
}

const findAll = (req, res) => {
  const itemList = getDiscoveryData()

  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(itemList))
}

const findById = (req, res) => {
  const itemList = getDiscoveryData()
  const item = itemList.find(item => item.id === req.params.id)

  if (!item) {
    res.status(404).send({ message: 'Discovery has not been found.' })
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(item))
}

const updateById = (req, res) => {
  let itemList = getDiscoveryData()

  if (!itemList.find((item) => item.id === req.params.id)) {
    res.status(404).send({ message : 'Discovery has not been found.'})
  }
  itemList = itemList.map(item => item.id === req.params.id ? { id: item.id, ...req.body } : item)

  setDiscoveryData(itemList)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(req.body))
}

const deleteById = (req, res) => {
  const itemList = getDiscoveryData()
  const item = itemList.find(elem => elem.id === req.params.id)
  if (item) {
    itemList.splice(itemList.indexOf(item), 1)
    setDiscoveryData(itemList)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send({ message: 'Discovery has been successfully removed.' })
  } else {
    res.status(404).send({ message: 'Discovery has not been found.' })
  }Î
}

const getDiscoveryData = () => {
  const list = fs.readFileSync(`${ __dirname }/${ DISCOVERY }`, 'utf8')
  return JSON.parse(list)
}

const setDiscoveryData = (list) => {
  return fs.writeFileSync(`${ __dirname }/${ DISCOVERY }`, JSON.stringify(list))
}

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById
}