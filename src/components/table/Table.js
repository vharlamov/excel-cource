import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'
import {resizeTable} from './resize'
import {TableSelect} from './TableSelection';
import { isCell, isFormula, shouldResize } from './table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: [
                'mousedown',
                'mouseup', 
                'mousemove', 
                'keydown', 
                'input'],
            ...options
        })

        this.isMove = false
    }

    toHTML() {
        return createTable(50)
    }

    onMousedown(event) {
        this.isMove = true

        if (shouldResize(event.target)) {
            resizeTable(this.$root, event, this.selection)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                this.selection.selectGroup(this.$root, $target)
            } else {
                this.selection.select(this.$root, $target)
                this.$emit('tableSelect', this.selection.current.text())
            }
        }
    }

    onMousemove(event) {
        if (!this.isMove) return

        const $target = $(event.target)

        if ($target.$el.dataset.type === 'cell') {
            if (event.button === 0) {
            this.selection.selectGroup(this.$root, $target)
            }
        }
    }

    onMouseup() {
        this.isMove = false
    }

    onKeydown(event) {
        if (isCell(event)) {
            this.selection.arrow(this.$root, event)
            this.$emit('tableSelect', this.selection.current.text())
        }

        if (['Enter', 'Tab'].includes(event.key)) {
            event.preventDefault()
            this.$emit('tableChangeFocus')
        }
        
        if (['Delete', 'Backspace'].includes(event.key)) {
                if (this.selection.group.length > 1) {
                event.preventDefault()
                this.selection.clearGroupText()
                this.$emit('tableSelect', this.selection.current.text())
            }
        }
    }

    onInput(event) {
        this.$emit('tableText', this.selection.current.text())
    }

    prepare() {
        this.selection = new TableSelect()
    }

    init() {
        super.init()

        window.onload = () => {
            const $startCell = this.$root.find('[data-id="0:0"]')
            this.selection.select(this.$root, $startCell)
        }

        this.$on('formulaText', text => {
            this.selection.current.text(text)
        })

        this.$on('formulaChangeFocus', () => {
                this.selection.current.$el.focus()
        })
    }
 }
