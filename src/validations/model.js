const mongoose = require('mongoose')
const joigoose = require('joigoose')(mongoose, {convert: false});

const eventSchema = require('./event.schema')
const discoverySchema = require('./discovery.schema')


const mongooseEventSchema = new mongoose.Schema(
  joigoose.convert(eventSchema),
  {versionKey: false}
)

const mongooseDiscoverySchema = new mongoose.Schema(
  joigoose.convert(discoverySchema),
  {versionKey: false}
)

module.exports = {
  mongooseEventSchema: mongoose.model('Event', mongooseEventSchema),
  mongooseDiscoverySchema: mongoose.model('Discovery', mongooseDiscoverySchema)
}