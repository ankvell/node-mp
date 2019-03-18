const j2s = require('joi-to-swagger')

const eventsSchema = require('./event.schema')
const discoveriesSchema = require('./discovery.schema')

const Event = j2s(eventsSchema).swagger.properties
const Discovery = j2s(discoveriesSchema).swagger.properties

const newSwaggerDocument = {
  EventCreate: Event.createSchema,
  EventUpdate: Event.updateSchema,
  DiscoveryCreate: Discovery.createSchema,
  DiscoveryUpdate: Discovery.updateSchema
}

module.exports = {
  newSwaggerDocument
}