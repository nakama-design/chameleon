const cardBody = document.querySelector('.card-body')

const createListener = () => {
  const cardField = document.querySelectorAll('.card-field')

  cardField.forEach(element => {
    element.addEventListener('click', (e) => {
      element.nextElementSibling.classList.add('card-expanded_active')
    }, false)
  })
}

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

const createGroup = (name) => {
  return `
    <div class="card-row card-row_group">
      <div class="card-field">
        <div class="card-field_name">Group ${name}</div>
      </div>
    </div>
  `
}

const createField = (obj) => {
  return `
    <div class="card-row card-row_data">
      <div class="card-field">
        <div class="card-field_name">${obj['name']}</div>
        <div class="card-field_route">${obj['route']}</div>
        <div class="card-field_description">${obj['description']}</div>
        <div class="card-field_method ${getClass(obj['method'])}">${obj['method']}</div>
      </div>
      <div class="card-expanded">
        <div class="card-expanded_content">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet dolor alias dolorum neque mollitia quam, totam est eius sunt beatae odio, quas incidunt deleniti enim libero molestiae corrupti molestias consequatur?
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

      res.map(item => {
        data.push(createGroup(item['group']))

        if (item['routes']) {
          item['routes'].map(item => {
            data.push(createField(item))
          })
        }
      })

      cardBody.insertAdjacentHTML('beforeEnd', data.join('\n'))
      createListener()
    })
}

generate()