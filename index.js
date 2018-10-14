const glob = require('glob')
const fs = require('fs')

const list = (dir) => {
  glob(`${dir}/*`, (err, files) => {
    files
      .filter(file => fs.lstatSync(file).isFile())
      .map(file => {
        const content = fs.readFileSync(file, 'utf-8')
        const regChamel = /\/\*\*[^\0]*\*\*\//g
        console.log(regChamel.exec(content))
      })
  })
}

list('../orori-api/application/controllers')