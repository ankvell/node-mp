const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const { newSwaggerDocument } = require('./src/validations/definitions.config')
const EventRoute = require('./src/routes/event')
const DescoveryRoute = require('./src/routes/discovery')
const mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/events'

const app = express()
const PORT = 3050

app.use(bodyParser.json())

EventRoute(app)
DescoveryRoute(app)

app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.message || 'Internal Server Error'
  })
})

mongoose.connect(URL, { useNewUrlParser: true })

const db = mongoose.connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup({...swaggerDocument, definitions: { ...newSwaggerDocument }}))
app.listen(PORT, () => console.log(`Express server listening on port ${ PORT }`))