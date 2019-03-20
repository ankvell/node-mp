const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const { newSwaggerDocument } = require('./src/validations/definitions.config')
const EventRoute = require('./src/routes/event')
const DescoveryRoute = require('./src/routes/discovery')

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const URL = 'mongodb://localhost:27017/events'

const app = express()
const PORT = 3050

app.use(bodyParser.json())

app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.message || 'Internal Server Error'
  })
})

mongoClient.connect(URL, { useNewUrlParser: true })
  .then((client) => {
    const db = client.db()

    EventRoute(app, db)
    DescoveryRoute(app, db)
  })
  .catch((err) => console.log(err))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup({...swaggerDocument, definitions: { ...newSwaggerDocument }}))
app.listen(PORT, () => console.log(`Express server listening on port ${ PORT }`))