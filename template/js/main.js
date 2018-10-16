const accordion = document.querySelector('.accordion')
const filterGroup = document.querySelector('#filterGroup')

const getClass = (method) => {
  switch (method) {
    case 'POST':
      return 'card-field_success'
      break
    case 'PUT':
      return 'card-field_info'
      break
    case 'PATCH':
      return 'card-field_warning'
      break
    case 'DELETE':
      return 'card-field_danger'
      break
    default:
      return 'card-field_primary'
      break
  }
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
}

const createDetail = (obj) => {
  return `
    <table class="table table-borderless">
      <tbody>
        <tr>
          <td style="width: 10%;">Name</td>
          <td style="width: 1%;">:</td>
          <td style="width: auto;">${obj['name']}</td>
        </tr>
        <tr>
          <td style="width: 10%;">Description</td>
          <td style="width: 1%;">:</td>
          <td style="width: auto;">${obj['description']}</td>
        </tr>
        <tr>
          <td style="width: 10%;">Route</td>
          <td style="width: 1%;">:</td>
          <td style="width: auto;">${obj['route']}</td>
        </tr>
        <tr>
          <td style="width: 10%;">File</td>
          <td style="width: 1%;">:</td>
          <td style="width: auto;">${obj['file']}</td>
        </tr>
      </tbody>
    </table>
  `
}

const createResponse = (obj) => {
  return 'createResponse'
}

const createSandbox = (obj) => {
  return 'createSandbox'
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

const createField = (obj, index, sub) => {
  return `
    <div class="card-row card-row_data" id="${createUnique()}">
      <div class="card-field" data-toggle="collapse" data-target="#collapse-${index}-${sub}" aria-expanded="true" aria-controls="collapse-${index}-${sub}">
        <div class="card-field_name">${obj['name']}</div>
        <div class="card-field_route">${obj['route']}</div>
        <div class="card-field_description">${obj['description']}</div>
        <div class="card-field_method ${getClass(obj['method'])}">${obj['method']}</div>
      </div>
      <div id="collapse-${index}-${sub}" class="collapse" aria-labelledby="heading-${index}-${sub}" data-parent="#accordion">
        <div class="collapse-inner">
          <ul class="nav nav-pills flex-column flex-sm-row mb-3" id="pills-tab" role="tablist">
            <li class="flex-sm-fill text-sm-center nav-item">
              <a class="nav-link active" id="pills-detail-tab" data-toggle="pill" href="#pills-detail" role="tab" aria-controls="pills-detail" aria-selected="true">detail</a>
            </li>
            <li class="flex-sm-fill text-sm-center nav-item">
              <a class="nav-link" id="pills-response-tab" data-toggle="pill" href="#pills-response" role="tab" aria-controls="pills-response" aria-selected="false">response</a>
            </li>
            <li class="flex-sm-fill text-sm-center nav-item">
              <a class="nav-link" id="pills-sanbox-tab" data-toggle="pill" href="#pills-sanbox" role="tab" aria-controls="pills-sanbox" aria-selected="false">sandbox</a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-detail" role="tabpanel" aria-labelledby="pills-detail-tab">
              ${createDetail(obj)}
            </div>
            <div class="tab-pane fade" id="pills-response" role="tabpanel" aria-labelledby="pills-response-tab">
              ${createResponse(obj)}
            </div>
            <div class="tab-pane fade" id="pills-sanbox" role="tabpanel" aria-labelledby="pills-sanbox-tab">
              ${createSandbox(obj)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

const generate = () => {
  fetch('data/routes.json')
    .then(res => res.json())
    .then(res => {      
      const data = []
      const group = []

      Object.keys(res).map(index => {
        data.push(createGroup(res[index]['group']))
        group.push(`<option value="${index}">Group ${index}</option>`)

        if (res[index]['routes']) {
          res[index]['routes'].map((item, key) => {
            data.push(createField(item, index, key))
          })
        }
      })

      accordion.insertAdjacentHTML('beforeEnd', data.join('\n'))
      filterGroup.insertAdjacentHTML('beforeEnd', group.join('\n'))

      createListener()
    })
}

generate()