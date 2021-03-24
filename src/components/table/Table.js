import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'
import {resizeTable} from './resize'
import {toSelect} from '@/components/table/TableSelection'
import {TableSelect} from './TableSelection';
import { isCell, shouldResize } from './table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown']
        })
    }

    toHTML() {
        return createTable(100)
    }

    onMousedown(event) {
        if (shouldResize(event.target)) {
            resizeTable(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                this.selection.selectGroup(this.$root, $target)
            } else {
                this.selection.select(this.$root, $target)
            }
        }
    }

    onKeydown(event) {
        if (isCell(event)) {
            const $target = $(event.target)
            this.selection.shift(this.$root, event)
    }
}

    prepare() {
        this.selection = new TableSelect()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(this.$root, $cell)
    }
 }
