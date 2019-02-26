const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()
const PORT = 3050

app.use(bodyParser.json())

require('./src/routes/event')(app)
require('./src/routes/discovery')(app)

app.use((err, req, res, next) => {
  res.status(500).send({
      error: err.message || 'Internal Server Error'
  })
})

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(PORT, () => console.log(`Express server listening on port ${ PORT }`))