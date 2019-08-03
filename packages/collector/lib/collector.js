const collector = __dirname
const project = process.cwd()

const execa = require('execa')
const glob = require('fast-glob')
const sander = require('sander')
const { log } = require('./utils')

const FLAG_COMMENTS = /\/\*(.|[\r\n])*?\*\//gm
const FLAG_ATTRIBUTES = /\@.*(?=\{)(.|[\r\n])*?\}|\@.+/gm

module.exports = async flags => {
  // Logging
  log.log('Collecting detected files')

  // Check existing laboon.yml
  const laboon = await sander.exists(project, '.laboon.yml')

  // Set default configuration
  const config = {
    format: [
      'md',
      'js'
    ],
    exclude: [
      'node_modules'
    ],
    source: 'src',
    destination: 'docs',
    host: '0.0.0.0',
    port: '3456',
  }
  
  if (laboon) {
    // parse yaml and replace current config
  }

  if (flags) {
    // replace current config with flags
  }

  // Create glob pattern
  const globPattern = config.format.map(format => {
    return `**/*.${format}`
  })

  // Glob possible files with pattern & ignore
  const globResult = await glob(globPattern, { ignore: config.exclude })

  log.log(`Founds ${globResult.length} file with format ${config.format.join(', ')}`)

  // Loop all files and get the content
  Promise.all(
    globResult
      .map(async file => {
        let result = null

        const format = file.split('.').pop()
        const content = await sander.readFile(file, { encoding: 'utf-8' })
        
        switch (format) {
          case 'js':
            if (FLAG_COMMENTS.test(content)) {
              const comments = content.match(FLAG_COMMENTS)

              if (comments.length > 0) {
                const attributes = comments[0].match(FLAG_ATTRIBUTES)
          
                result = attributes
              }
            }     
            break;
        
          default:
            result = content
            break;
        }
  
        return result
      })
  ).then(filterable => {
    const results = filterable.filter(available => {
      return available !== null
    })

    // Reject operation if collector cannot find a content
    if (results.length === 0) {
      log.log('Cannot find a valid content for laboon, process exited.')
      process.exit(0)
    }
  
    // Found a contents and ready to generate
    else {
      console.log(results)
    }
  })
}