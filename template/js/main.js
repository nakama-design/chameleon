const pageData = {
  config: {},
  content: {}
}
const accordion = document.querySelector('.accordion')
const selectGroup = document.querySelector('#filterGroup')

const getClass = (method) => {
  switch (method) {
    case 'POST':
      return 'card-field_success'
    case 'PUT':
      return 'card-field_info'
    case 'PATCH':
      return 'card-field_warning'
    case 'DELETE':
      return 'card-field_danger'
    default:
      return 'card-field_primary'
  }
}

const getBackroundColor = (method) => {
  switch (method) {
    case 'POST':
      return '#17C671'
    case 'PUT':
      return '#00B8D8'
    case 'PATCH':
      return '#FFB400'
    case 'DELETE':
      return '#C4183C'
    default:
      return '#007BFF'
  }
}

const filterSearch = (value) => {
  if (value.length > 3) {
    console.log(pageData['content'])
  }
}

const filterGroup = (value) => {
  let bracket = {}

  accordion.innerHTML = ''

  if (pageData['content'][value]) {
    bracket[value] = pageData['content'][value]
  } else {
    bracket = pageData['content']
  }

  renderPage(bracket)
}

const createUnique = () => {
  return Math.random().toString(36).substr(2, 16)
}

const createListener = () => {
  const listItem = document.querySelectorAll('.card-row_data')
  listItem.forEach(element => {
    element.addEventListener('click', () => {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }, false)
  })

  hljs.initHighlightingOnLoad()
  new ClipboardJS('[data-clipboard-target]')
}

const createGroup = (name) => {
  return `
    <div class="card-row card-row_group" id="${createUnique()}">
      <div class="card-field">
        <div class="card-field_name">Group ${name}</div>
      </div>
    </div>
  `
}

const createDummy = (type) => {
  switch (type) {
    case 'Integer':
      return 123456
  
    default:
      return 'John Doe'
  }
}

const createParameter = (obj) => {
  if (obj['parameter']) {
    const bracket = {}
    const types = obj['method'] === 'GET' ? 'param' : 'data'

    Object.keys(obj['parameter']).map(item => {
      bracket[item] = createDummy(obj['parameter'][item])
    })

    return `, {
      ${types}: ${JSON.stringify(bracket, false, 4)}
    }`
  }
  return ''
}

const createRequest = (obj, config) => {
  return `
    axios
  .${obj['method'].toLowerCase()}('${config['endpoint'] + config['path'] + obj['route']}'${createParameter(obj)})
  .then(res => {
    console.log(res)
  })
  `.trim()
}

const createField = (obj, config, index, sub) => {
  return `
    <div class="card-row card-row_data" id="${createUnique()}">
      <div class="card-field" data-toggle="collapse" data-target="#collapse-${index}-${sub}" aria-expanded="true" aria-controls="collapse-${index}-${sub}">
        <div class="card-field_name">${obj['name']}</div>
        <div class="card-field_route">${config['path'] + obj['route']}</div>
        <div class="card-field_description">${obj['description']}</div>
        <div class="card-field_method ${getClass(obj['method'])}">${obj['method']}</div>
      </div>
      <div id="collapse-${index}-${sub}" class="collapse" aria-labelledby="heading-${index}-${sub}" data-parent="#accordion">
        <div class="collapse-inner">
          <div class="content-left">
            <div class="content-title">
              <span style="background-color: ${getBackroundColor(obj['method'])};">${obj['method']}</span>
              ${obj['name']}
            </div>
            <div class="content-description">
              ${obj['description']}
            </div>
            <div class="content-route">
              <div id="route-path-${index}-${sub}">
                ${config['endpoint'] + config['path'] + obj['route']}
              </div>
              <button class="btn btn-default" data-clipboard-target="#route-path-${index}-${sub}">Copy</button>
            </div>
            <div class="content-description">
              Example Request
            </div>
            <div class="content-route">
              <div id="request-${index}-${sub}">
                <pre><code class="javascript">${createRequest(obj, config)}</code></pre>
              </div>
              <button class="btn btn-default" data-clipboard-target="#request-${index}-${sub}">Copy</button>
            </div>
          </div>
          <div class="content-right">
            <div class="content-code">Response</div>
            <pre><code class="json">${JSON.stringify(obj['response'], false, 4)}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `
}

const getConfig = async () => {
  return await fetch('data/config.json').then(res => res.json())
}

const renderPage = (content) => {
  const data = []
  const rendered = content || pageData['content']
  
  Object.keys(rendered).map(index => {
    data.push(createGroup(rendered[index]['group']))

    if (rendered[index]['routes']) {
      rendered[index]['routes'].map((item, key) => {
        data.push(createField(item, pageData['config'], index, key))
      })
    }
  })

  accordion.insertAdjacentHTML('beforeEnd', data.join('\n'))

  createListener()
}

const generate = async () => {
  const config = await getConfig()

  await fetch('data/routes.json')
    .then(res => res.json())
    .then(res => {      
      pageData['config'] = config
      pageData['content'] = res

      const group = []
      
      Object.keys(res).map(index => {
        group.push(`<option value="${index}">Group ${index}</option>`)
      })

      selectGroup.insertAdjacentHTML('beforeEnd', group.join('\n'))

      renderPage()
    })
}

generate()