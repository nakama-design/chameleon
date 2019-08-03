const {Signale} = require('signale')

const options = {
  disabled: false,
  interactive: false,
  logLevel: 'info',
  secrets: [],
  scope: '🐋  LABOON',
  stream: process.stdout
}

const log = new Signale(options)

module.exports = {
  log
}