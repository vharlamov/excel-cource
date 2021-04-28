import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import * as actions from '../../redux/actions'
import { applyHeaderState } from '../../redux/applyState';
import { debounce } from '../../core/utils';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML() {
        return `
        <input type="text" class="input" value="Новая таблица"/>
        <div>
            <div class='button'>
                <i class='material-icons'>delete_outline</i>
            </div>

            <div class='button'>
                <i class='material-icons'>exit_to_app</i>
            </div>
        </div>`
    }

    prepare() {
        this.onInput = debounce(this.onInput, 500)
    }

    onInput(event) {
        const value = $(event.target).text()
        this.$dispatch(actions.changeHeader(value))
    }

    init() {
        super.init()
        applyHeaderState(this.$root)
    }
}

