import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'
import {resizeTable} from './resize'
import {TableSelect} from './TableSelection';
import { 
    isCell, 
    isColumn, 
    isRow, 
    shouldResize, 
    sortRows
    } from './table.functions';
import * as actions from '../../redux/actions';
import { applyTableState } from '../../redux/applyState';
import { defaultStyles } from '../../constants';
import { isStyles } from '../../core/utils';
import { parse } from '../../core/parse';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

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
        return createTable(50, this.store.getState())
    }

    async resize(event) {
        try {
            const data = await resizeTable(this.$root, event, this.selection)
            this.$dispatch(actions.tableResize(data))
            this.selection.groupRect(this.$root)
        } catch (e) {
            console.warn(e => 'Resize errror!', e.message)
        }
    }

    selectCell($cell) {
        const id = $cell.data.id
        const formulaData = this.store.getState().formulaState[id] || ''
        const text = () => {
            if (formulaData) {
                return formulaData
            } else {
                return $cell.text()
            }
        }

        this.selection.select(this.$root, $cell)
        this.$emit('tableSelect', text())
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        
        if (isStyles(styles)) {
            this.$dispatch(actions.changeStyles(styles))
        } else {
            this.$dispatch(actions.changeStyles(defaultStyles))
        }
    }

    onMousedown(event) {
        this.isMove = true
        
        const $target = $(event.target)

        if (shouldResize(event.target)) {
            this.resize(event)
        } else if (isCell(event)) {
            if (event.shiftKey) {
                this.selection.selectGroup(this.$root, $target)
            } else {
                this.selectCell($target)
                this.$dispatch('tableSelect')
            }
        } else if (isColumn(event)) {
            this.selection.selectColumn(this.$root, $target)
        } else if (isRow(event)) {
            this.selection.selectRow(this.$root, $target)
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
            this.$dispatch('tableSelect')
        }

        if (['Enter', 'Tab'].includes(event.key)) {
            event.preventDefault()
            this.$emit('tableChangeFocus')
        }
        
        if (['Delete', 'Backspace'].includes(event.key)) {
            if (this.selection.group.length > 1) {
                event.preventDefault()
                this.selection.clearGroupText()

                for (let el of this.selection.group) {
                    this.$dispatch(actions.changeText({
                        id: this.selection.ids,
                        value: ''
                    }))
                    this.$dispatch(actions.formula({
                        id: this.selection.ids,
                        value: ''
                    }))
                }
            }
        }
    }

    onInput(event) {
        const value = $(event.target).text()
        this.updateTextInStore(value)
        this.$emit('tableChangeText', value)
        this.$dispatch(actions.formula({
            id: this.selection.current.data.id,
            value: ''
        }))
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.ids,
            value
        }))
    }

    prepare() {
        this.selection = new TableSelect()
    }

    init() {
        super.init()

        this.$on('formulaText', value => {
            if (value.length > 1) {
                this.selection.group
                    .forEach(el => el.text(String(parse(value))))
                if (typeof parse(value) === 'number') {
                    this.$dispatch(actions.formula({
                        id: this.selection.ids,
                        value
                    }))
                } 
                
                this.updateTextInStore(String(parse(value)))
            }
        })

        this.$on('formulaChangeFocus', () => {
                this.selection.current.$el.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyles({
                value,
                id: this.selection.ids
            }))
        })


        this.$on('toolbar:sort', 
            value => {
                const current = this.selection.current

                if (!current.data) {
                    return
                }
                
                this.$dispatch(actions.sorting({
                    sequence: sortRows(
                        this.store.getState(), 
                        current.data.id, 
                        value
                        ),
                    sortType: value
                    })
                )
                    
                this.$root.html(this.toHTML())
                
                applyTableState(
                    this.$root, 
                    this.store.getState(), 
                    ActiveRoute.param)
                
                    this.selection.saveGroup(this.$root)
                    this.selection.groupRect(this.$root)
                  }
        )

        this.$on('toolbar:clearStyles', () => {
            this.selection.applyStyle('')
            this.$dispatch(actions.clearStyles(this.selection.ids))
            })

        window.onload = () => {
            const $startCell = this.$root.find('[data-id="0:0"]')
            this.selection.select(this.$root, $startCell)
        }
    }
 }
