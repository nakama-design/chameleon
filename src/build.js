const fs = require('fs')
const fx = require('fs-extra')
const glob = require('glob')
const path = require('path')

const tokenize = (arr) => {
  const bracket = {}
  let parent = null
  let parentesis = false

  arr.map(line => {
    const split = line.split(':').map(item => item.replace('@', '').trim())

    if (split[0] === 'chameleon') {
      return
    }

    if (split[0] === '}') {
      parent = null
      parentesis = false
    }

    if (split[1] === '{') {
      parent = split[0]
      bracket[parent] = {}
      parentesis = true
    }

    if (!split.includes('{') && !split.includes('}')) {
      if (parentesis) {
        bracket[parent][split[0]] = split[1]
      } else {
        bracket[split[0]] = split[1]
      }
    }
  })

  return bracket
}

const extract = (arr) => {
  return arr.map(string => {
    const cleanup = string.replace(/^\s+\*\s|\/\*+|^\s+\*\//gm, '')
    return tokenize(cleanup.split('\n').filter(item => item !== ''))
  })
}

const getRoutes = async (directory) => {
  return new Promise(resolve => {
    glob(`${directory}/*`, async (err, files) => {    
      const data = []
  
      await files.filter(file => fs.lstatSync(file).isFile()).map(file => {
        const content = fs.readFileSync(file, 'utf-8')
        const getComment = /\/\*(\*(?!\/)|[^*])*\*\//gm
        
        if (getComment.test(content)) {
          const source = content.match(getComment).filter(item => {
            return item.includes('@chameleon')
          })
  
          data.push(extract(source))
        }
      })
  
      resolve(await data.filter(item => item.length > 0))
    })
  })
}

module.exports = async (
  config,
  chameleon,
  project,
  write,
  info,
  done,
  error
) => {
  const template = path.resolve(chameleon, '../template')
  const destination = path.resolve(project, config['destination'] || 'docs')
  const sourceDir = path.resolve(project, config['source'])
  const targetDir = path.resolve(destination, 'data')
  const configFile = path.resolve(targetDir, 'config.json')
  const routesFile = path.resolve(targetDir, 'routes.json')

  if (!fs.existsSync(destination)) {
    write(info('Creating docs folder'))
    await fx.mkdirpSync(destination)
  }

  write(info('Copying documentation template'))
  await fx.copySync(template, destination)

  write(info('Copying configuration file'))
  await fs.writeFileSync(configFile, JSON.stringify(config, false, 2))

  write(info('Collecting routes'))
  const routes = await getRoutes(sourceDir)

  write(info('Creating routes configuration'))
  await fs.writeFileSync(routesFile, JSON.stringify(routes, false, 2))

  return 'done'
}
