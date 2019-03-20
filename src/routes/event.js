const eventRouter = (app, db) => {

  const eventsHandler = require('../handlers/events-handler')(db)

  app.get('/event', eventsHandler.findAll)
  app.get('/event/:id', eventsHandler.findById)
  app.post('/event', eventsHandler.create)
  app.put('/event/:id', eventsHandler.updateById)
  app.delete('/event/:id', eventsHandler.deleteById)
}

module.exports = eventRouter