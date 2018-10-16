const accordion = document.querySelector('.accordion')
const filterGroup = document.querySelector('#filterGroup')

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

const createUnique = () => {
  return Math.random().toString(36).substr(2, 16)
}

const createListener = () => {
  const listItem = document.querySelectorAll('.card-row_data')
  hljs.initHighlightingOnLoad()
  listItem.forEach(element => {
    element.addEventListener('click', () => {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }, false)
  })
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

const copyThis = () => {
  console.log('fooo')
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
            <div class="content-route" onclick="this.copyThis">
              ${config['endpoint'] + config['path'] + obj['route']}
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

const generate = async () => {
  const config = await getConfig()

  await fetch('data/routes.json')
    .then(res => res.json())
    .then(res => {      
      const data = []
      const group = []

      Object.keys(res).map(index => {
        data.push(createGroup(res[index]['group']))
        group.push(`<option value="${index}">Group ${index}</option>`)

        if (res[index]['routes']) {
          res[index]['routes'].map((item, key) => {
            data.push(createField(item, config, index, key))
          })
        }
      })

      accordion.insertAdjacentHTML('beforeEnd', data.join('\n'))
      filterGroup.insertAdjacentHTML('beforeEnd', group.join('\n'))

      createListener()
    })
}

generate()