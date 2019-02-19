const discoveryHandler = require('../handlers/discovery-handler')

const discoveryRouter = (app) => { 
  app.get('/discovery', discoveryHandler.findAll)
  app.get('/discovery/:id', discoveryHandler.findById)
  app.post('/discovery', discoveryHandler.create)
  app.put('/discovery/:id', discoveryHandler.updateById)
  app.delete('/discovery/:id', discoveryHandler.deleteById)
}

module.exports = discoveryRouter