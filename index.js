const glob = require('glob')
const fs = require('fs')

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

const list = (dir) => {
  return new Promise(resolve => {
    glob(`${dir}/*`, async (err, files) => {    
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

list('./example').then(res => {
  console.log(res)
})