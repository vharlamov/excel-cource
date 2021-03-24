import {$} from '@core/dom'
import { parseId } from './table.functions'

export class TableSelect {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    shift($root, event) {
        event.preventDefault()
        let dir = event.key

        if (dir.indexOf('Arrow') !== 0 
            && dir.indexOf('Tab') !== 0 
            && dir.indexOf('Enter') !== 0) {
            return
        }
        
        if (event.shiftKey && dir === 'Tab') {
            dir = 'ArrowLeft'
        } else if (event.shiftKey && dir === 'Enter') {
            dir = 'ArrowUp'
        }

        const $el = $root.find('.' + TableSelect.className)

        const cellIndex = $el.data.id.split(':')

        const row = +cellIndex[0]
        const cell = +cellIndex[1]

        let $nextEl

        switch (dir) {
            case 'ArrowUp': 
                $nextEl = $root.find(`[data-id="${row - 1}:${cell}"]`)
            break
            case 'ArrowDown':
            case 'Enter':
                $nextEl = $root.find(`[data-id="${row + 1}:${cell}"]`)
            break
            case 'ArrowLeft':
                $nextEl = $root.find(`[data-id="${row}:${cell - 1}"]`)
            break
            case 'ArrowRight':
            case 'Tab':
                $nextEl = $root.find(`[data-id="${row}:${cell + 1}"]`)
        } 
        
        if ($nextEl.$el) {
            this.select($root, $nextEl)
        } 
    }

    select($root, $el) {
        this.clear($root)
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelect.className)
        $el.$el.focus()
    }

    selectGroup($root, $el) {
        const start = parseId(this.current)
        const end = parseId($el)

        this.clear($root)

        const rowMin = Math.min(start[0], end[0])
        const rowMax = Math.max(start[0], end[0])
        const cellMin = Math.min(start[1], end[1])
        const cellMax = Math.max(start[1], end[1])

        for (let row=rowMin; row<=rowMax; row++) {
            for (let cell=cellMin; cell<=cellMax; cell++) {
                const $addedCell = $root.find(`[data-id="${row}:${cell}"]`)
                this.group.push($addedCell)
            }
        }
            
        this.group.forEach(el => el.addClass(TableSelect.className))
    }

    clear($root) {
        const allSelected = $root.findAll('.' + TableSelect.className)

        for (let elem of allSelected) {
            elem.classList.remove(TableSelect.className)
        }

        this.group = []
    }
}

