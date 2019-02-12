const http = require('http')
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'app/data');


const PORT = 3050

const { eventList, details } = require('./app/data')
const { joinById } = require('./app/join-by-id')

const requestHandler = (req, res) => {
  const file = path.join(dir, 'jokulsarlon_ice.jpg')
  
  const s = fs.createReadStream(file)
  s.on('open', function () {
      res.setHeader('Content-Type', 'image/jpeg')
      s.pipe(res)
  })
  s.on('error', function () {
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 404
      res.end('Not found')
  });
}

const server = http.createServer(requestHandler)
server.listen(PORT, (err) => {
  if (err) {
    return console.log('The connection was terminated due to ', err)
  }

  console.log(`Server is listening on ${ PORT }`)
})