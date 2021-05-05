import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import * as actions from '../../redux/actions'
import { applyHeaderState } from '../../redux/applyState';
import { debounce } from '../../core/utils';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    toHTML() {
        return `
        <input type="text" class="input" value="Новая таблица"/>
        <div>
            <div class='button' data-type='to-delete'>
                <i class='material-icons' data-type='to-delete'>
                    delete_outline
                </i>
            </div>

            <div class='button' data-type='to-home'>
                <i class='material-icons' data-type='to-home'>
                    exit_to_app
                </i>
            </div>
        </div>`
    }

    prepare() {
        this.onInput = debounce(this.onInput, 500)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'to-home') {
            ActiveRoute.navigate('')
        } else if ($target.data.type === 'to-delete') {
            const decision = confirm(
                'Вы действительно хотите удалить таблицу?')

            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        }
    }

    onInput(event) {
        const value = $(event.target).text()
        this.$dispatch(actions.changeHeader(value))
    }

    init() {
        super.init()

        const state = this.store.getState()
    }
}

