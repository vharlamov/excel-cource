import {$} from '@core/dom'
import { parseId, Range } from './table.functions'

export class TableSelect {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    arrow($root, event) {
        let dir = event.key


        if (dir.indexOf('Arrow') !== 0) {
            return
        }
        event.preventDefault()
        
        let $el = $root.find('.' + TableSelect.className)
        $el = $el ? $el : this.current

        const cellIndex = $el.data.id.split(':')

        const row = +cellIndex[0]
        const cell = +cellIndex[1]

        let $nextEl

        switch (dir) {
            case 'ArrowUp': 
                $nextEl = $root.find(`[data-id="${row - 1}:${cell}"]`)
            break
            case 'ArrowDown':
                $nextEl = $root.find(`[data-id="${row + 1}:${cell}"]`)
            break
            case 'ArrowLeft':
                $nextEl = $root.find(`[data-id="${row}:${cell - 1}"]`)
            break
            case 'ArrowRight':
                $nextEl = $root.find(`[data-id="${row}:${cell + 1}"]`)
        } 
        
        if ($nextEl.$el) {
            if (event.shiftKey) {
                this.group.push($nextEl)
                this.groupRect($root)
            } else {
                this.select($root, $nextEl) 
            }
        } 
    }

    select($root, $el) {
        this.clear()
        this.clearRect()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelect.className)
        $el.$el.focus()
        this.groupRect($root)
    }

    selectColumn($root, $el) {
        this.clear()
        this.clearRect()

        const colIndex = $el.data.col
        const entireCol = $root.findAll(`[data-col="${colIndex}"]`)
        const cells = [...entireCol].slice(1)

        cells.forEach(el => {
            el.classList.add(TableSelect.className)
            this.group.push($(el))
        })

        this.current = cells[0]
        cells[0].focus()
        this.groupRect($root)
    }

    selectRow($root, $el) {
        this.clear()
        this.clearRect()

        const $parent = $el.closest('.row')
        const cells = $parent.findAll('[data-type="cell"]')

        cells.forEach(el => {
            el.classList.add(TableSelect.className)
            this.group.push($(el))
        })

        this.current = cells[0]
        cells[0].focus()
        this.groupRect($root)
    }

    selectGroup($root, $el) {
        const start = parseId(this.current)
        const end = parseId($el)

        this.clear()

        const rowDiap = [start[0], end[0]].sort((a, b) => a - b)
        const cellDiap = [start[1], end[1]].sort((a, b) => a - b)

        const rowRange = new Range(...rowDiap)
        const cellRange = new Range(...cellDiap)

        for (let row of rowRange) {
            for (let cell of cellRange) {
                const $addedCell = $root.find(`[data-id="${row}:${cell}"]`)
                this.group.push($addedCell)
            }
        }
            
        this.group.forEach(el => el.addClass(TableSelect.className))
        
        this.groupRect($root)
    }

    groupRect($root) {
        this.clearRect()
        
        let gTop = this.group[0].getCoords().top
        let gLeft = this.group[0].getCoords().left
        let gBottom = this.group[this.group.length - 1]
            .getCoords().bottom
        let gRight = this.group[this.group.length - 1]
            .getCoords().right

        if (this.group.length) {
            const $selectRect = $.create('div', 'selected_rect')
            $selectRect.css({
                position: 'absolute',
                top: gTop - 97 + 'px',
                left: gLeft + 'px',
                height: gBottom - gTop - 2 + 'px',
                width: gRight - gLeft - 1 + 'px'
            })

            $root.append($selectRect.$el)
        }
    }

    clearGroupText() {
        this.group.forEach(el => el.text(''))
    }

    clear() {
        this.group.forEach(el => {
            if (el) {
                el.removeClass([TableSelect.className])
            }
        })
        this.group = []
    }

    get ids() {
        return this.group.map(el => el.data.id)
    }

    clearRect() {
        if ($('.selected_rect').$el) {
            let $sr = $('.selected_rect')
            $sr.$el.remove()
            $sr = null
        }
    }

    applyStyle(style) {
        this.group.forEach(el => el.css(style))
    }
}

