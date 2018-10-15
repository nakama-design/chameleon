const cardField = document.querySelectorAll('.card-field')
cardField.forEach(element => {
  element.addEventListener('click', (e) => {
    element.nextElementSibling.classList.add('card-expanded_active')
  }, false)
})