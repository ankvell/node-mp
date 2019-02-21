const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

require('./src/routes/event')(app)
require('./src/routes/discovery')(app)

app.use((err, req, res)=>{
  res.status(500).send({
      error: err.message || 'Internal Server Error'
  })
})
app.use('/swagger', express.static('api/swagger/'));
app.listen(PORT, () => console.log(`Express server listening on port ${ PORT }`))