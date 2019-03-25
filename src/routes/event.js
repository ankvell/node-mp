const eventRouter = (app) => {

  const eventsHandler = require('../handlers/events-handler')()

  app.get('/event', eventsHandler.findAll)
  app.get('/event/:id', eventsHandler.findById)
  app.post('/event', eventsHandler.create)
  app.put('/event/:id', eventsHandler.updateById)
  app.delete('/event/:id', eventsHandler.deleteById)
}

module.exports = eventRouter