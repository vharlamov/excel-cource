import { createButtons } from "./toolbar.template"
import { $ } from "../../core/dom"
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import { defaultStyles } from "../../constants"
import * as actions from '../../redux/actions'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        const initialState = defaultStyles
        this.initState(initialState)
    }

    get template() {
        return createButtons(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        const values = ['sortNum', 'sortABC', 'clearStyles']
        const value = JSON.parse($target.data.value)

        if ($target.data.type === 'button') {
            if (value.sort) {
                this.$emit('toolbar:sort', value.sort)
            }

            if (value === 'clearStyles') {
                this.$emit('toolbar:clearStyles')
            }

            if (!values.includes(value)) {
                this.$emit('toolbar:applyStyle', value)
    
                const key = Object.keys(value)
                this.setState({[key]: value[key]})
            }
        }
    }
}
