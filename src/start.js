const path = require('path')
const build = require('./build')
const http = require('http')
const reload = require('reload')
const express = require('express')
const chokidar = require('chokidar')
const { pathExistsSync } = require('fs-extra')

module.exports = (project, config, write, info, done, error) => {
  const app = express()
  const target = path.join(project, '.halsa')
  const port = config['port'] || 3000
  const reloadable = [
    path.join(project, '/pages/'),
    path.join(project, '/layouts/'),
    path.join(project, '/themes/'),
    path.join(project, '/static/'),
    path.join(project, '/halsa.yml')
  ]

  if (!pathExistsSync(target)) {
    build(project)
  }

  app.set('port', port)
  app.get('/', (req, res) => {
    res.sendFile(path.join(target, 'index.html'))
  })

  app.use('/', express.static(target))

  let first = true
  const watcher = chokidar.watch(reloadable, {
    ignored: /^\./,
    persistent: true
  })
  const server = http.createServer(app)
  const serverReload = reload(app)
  const restart = (file) => {
    if (first) {
      write(done(`Watching file ${file.replace(project, '')} changed`))
    } else {
      write(info(`File ${file.replace(project, '')} changed`))
    }

    build(project)

    serverReload.reload()
  }

  setTimeout(() => {
    first = !first
  }, 2000)

  watcher
    .on('add', (path) => {restart(path)})
    .on('change', (path) => restart(path))
    .on('unlink', (path) => restart(path))
    .on('error', (path) => {
      process.exit(0)
    })

  server.listen(app.get('port'), function () {
    write(info('Web server listening on port ' + app.get('port')))
  })
}