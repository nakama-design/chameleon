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

const getContent = (string, file) => {
  const cleanup = string.replace(/^\s+\*\s|\/\*+|^\s+\*\//gm, '')
  const data = tokenize(cleanup.split('\n').filter(item => item !== ''))
  data['file'] = file
  return {
    group: data['group'] || 'unknown',
    content: data
  }
}

const getRoutes = async directory => {
  return new Promise (resolve => {
    glob(`${directory}/*`, (err, files) => {
      const bracket = {}
      const filter = files.filter(file => fs.lstatSync(file).isFile())

      Promise.all(filter.map(file => {
        const string = fs.readFileSync(file, 'utf-8')
        const regex = /\/\*(\*(?!\/)|[^*])*\*\//gm
        
        if (regex.test(string)) {
          return string.match(regex).filter(comment => {
            return comment.includes('@chameleon')
          }).map(comment => {
            const { group, content } = getContent(comment, file)

            if (typeof bracket[group] === 'undefined') {
              bracket[group] = {
                group: group,
                routes: []
              }
            }
            bracket[group]['routes'].push(content)
          })
        }
      })).then(res => {
        resolve(bracket)
      })
    })
  })
}

module.exports = async (
  config,
  chameleon,
  project,
  write,
  info
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

  if (!fs.existsSync(targetDir)) {
    write(info('Copying documentation template'))
    await fx.copySync(template, destination)
  }

  write(info('Copying configuration file'))
  await fs.writeFileSync(configFile, JSON.stringify(config, false, 2))

  write(info('Collecting routes'))

  const routes = await getRoutes(sourceDir)

  write(info('Creating routes configuration'))
  await fs.writeFileSync(routesFile, JSON.stringify(routes, false, 2))

  return 'done'
}
