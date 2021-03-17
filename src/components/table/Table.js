import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'
import {resizeTable} from './resize'
import {toSelect} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'click', 'keydown']
        })
    }

    toHTML() {
        return createTable(100)
    }

    onMousedown(event) {
        resizeTable(this.$root, event)
    }

    onClick(event) {
        toSelect(this.$root, event)
    }

    onKeydown(event) {
        toSelect(this.$root, event)
    }
 }
