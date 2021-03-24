export function shouldResize($target) {
   return $target.dataset.resize
}

export function isCell(event) {
   return event.target.dataset.type === 'cell'
}

export function parseId($el) {
   return $el.data.id.split(':').map(e => +e)
}
