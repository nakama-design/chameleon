const path = require('path')
const http = require('http')
const express = require('express')

module.exports = async (project, config, write, info, done, error) => {
  const app = express()
  const port = config['port'] || 1234
  const docs = path.join(project, config['destination'])

  app.set('port', port)
  app.get('/', (req, res) => {
    res.sendFile(path.join(docs, 'index.html'))
  })

  app.use('/', express.static(docs))

  const server = http.createServer(app)

  server.listen(app.get('port'), function () {
    write(info('Web server listening on port ' + app.get('port')))
  })
}