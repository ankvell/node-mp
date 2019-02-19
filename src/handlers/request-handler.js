const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '../public/')

const { eventList, details } = require('../db/data')
const { joinById } = require('../utils/join-by-id')

const getEventsList = (req, res) => {
  const data = joinById(eventList, details)
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end(JSON.stringify({ events: data }))
}

const getImageData = (req, res) => {
  const file = path.join(dir, 'unsplash.jpg')
  
  const s = fs.createReadStream(file)
  s.on('open', () => {
      res.setHeader('Content-Type', 'image/jpeg')
      s.pipe(res)
  })
  s.on('error', () => {
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 404
      res.end('Not found')
  });
}

module.exports = {
  getEventsList,
  getImageData
}