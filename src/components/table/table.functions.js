export function shouldResize($target) {
   return $target.dataset.resize
}

export function isCell(event) {
   return event.target.dataset.type === 'cell'
}

export function isColumn(event) {
   return event.target.className === 'column'
}

export function isRow(event) {
   return event.target.className === 'row-info'
}

export function parseId(id) {
   return id.split(':').map(e => +e)
}

export function unParse(id) {
   return id.join(':').toString()
}

export class Range {
   constructor(start, end) {
       this.start = start,
       this.end = end
   }

   * [Symbol.iterator]() {
       for (let i = this.start; i <= this.end; i++) {
           yield i
       }
   }
}

export function sortRows(state, colID, type = 'sortNum') {
   const col = parseId(colID)[1]

   let sequence = new Set()

   const items = Object.entries(state.dataState)
   const toSort = items.filter(([id, value]) => parseId(id)[1] === col && value)
   const dir = state[type] === 'asc' ? 1 : -1

   switch (type) {
      case 'sortNum':
         sortNum(toSort, items, sequence, dir)
         break
      case 'sortABC':
         sortABC(toSort, items, sequence, dir)
         break
       default: sortNum(toSort, items, sequence, dir)
     }
   
   return Array.from(sequence) 
   }

function sortNum(toSort, items, sequence, dir) {
   const numbers = toSort.filter(item => {
      return !isNaN(+item[1])
   })

   numbers
      .sort((a, b) => (+b[1] - +a[1]) * dir)
      .forEach(el => sequence.add(parseId(el[0])[0]))

   items.forEach(el => sequence.add(parseId(el[0])[0]))
}
   
function sortABC(toSort, items, sequence, dir) {
   const strings = toSort.filter(item => {
      return isNaN(+item[1])
   })
   strings
      .sort((a, b) => (a[1].localeCompare(b[1], 'ru-RU')) * dir)
      .forEach(el => sequence.add(parseId(el[0])[0]))

   items.forEach(el => sequence.add(parseId(el[0])[0]))
}


