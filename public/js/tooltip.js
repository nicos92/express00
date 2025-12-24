// Crear el elemento tooltip una sola vez en el DOM
const tooltip = document.createElement('div')
tooltip.classList.add('custom-tooltip')
document.body.appendChild(tooltip)

const textElements = document.querySelectorAll('.card__text')

textElements.forEach((el) => {
  el.addEventListener('mouseenter', (e) => {
    // Solo mostrar si el texto realmente está cortado (scrollHeight > clientHeight)
    if (el.scrollHeight > el.clientHeight) {
      setTimeout(() => {
        tooltip.textContent = el.getAttribute('data-fulltext')
        tooltip.style.display = 'block'
      }, 1000)
    }
  })

  el.addEventListener('mousemove', (e) => {
    // Posicionar el tooltip cerca del cursor
    tooltip.style.left = e.pageX + 15 + 'px'
    tooltip.style.top = e.pageY + 15 + 'px'
  })

  el.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none'
  })
})
