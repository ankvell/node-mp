const http = require('http')
const PORT = 3050

const { eventList, details } = require('./app/data')
const { joinById } = require('./app/join-by-id')

const requestHandler = (req, res) => {
  const data = joinById(eventList, details)
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end(JSON.stringify({ events: data }))
}

const server = http.createServer(requestHandler)

server.listen(PORT, (err) => {
  if (err) {
    return console.log('The connection was terminated due to ', err)
  }

  console.log(`Server is listening on ${ PORT }`)
})