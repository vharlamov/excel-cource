export function shouldResize($target) {
   return $target.dataset.resize
}

export function isCell(event) {
   return event.target.dataset.type === 'cell'
}

export function parseId($el) {
   return $el.data.id.split(':').map(e => +e)
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

