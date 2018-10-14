const glob = require('glob')
const fs = require('fs')

const list = (dir) => {
  glob(`${dir}/*`, (err, files) => {
    files
      .filter(file => fs.lstatSync(file).isFile())
      .map(file => {
        const content = fs.readFileSync(file, 'utf-8')
        const regChamel = /\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+/g
        console.log(content.match(regChamel))
      })
  })
}

list('../orori-api/application/controllers')