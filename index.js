const http = require('http')
const PORT = 3050

const { getEventsList, getImageData } = require('./src/handlers/request-handler')

const server = http.createServer(getImageData)
server.listen(PORT, (err) => {
  if (err) {
    return console.log('The connection was terminated due to ', err)
  }

  console.log(`Server is listening on ${ PORT }`)
})