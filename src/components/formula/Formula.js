import {ExcelComponent} from '@core/ExcelComponent';
import { $ } from '../../core/dom';
import { parse } from '../../core/parse';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown', 'mousedown'],
            subscribe: ['currentText', 'formulaState'],
            ...options
            }   
        )
    }

    toHTML() {
        return `
        <div class="info"><p>fx</p></div>
        <div class="input" contenteditable="true" 
            spellcheck="false" data-type="formula">
        </div>`
    }

    onKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.$emit('formulaChangeFocus')
        }
    }

    onInput(event) {
      const isDelete = [
          'deleteContentForward', 
          'deleteContentBackward'
        ].includes(event.inputType)

        this.$emit('formulaText', {
          text: $(event.target).text(),
          isDelete: isDelete
        })
    }

    onMousedown(event) {
        this.$emit('formulaText', {
          text: $(event.target).text(),
          isDelete: false
        })
    }

    init() {
        super.init()

        this.$formula = this.$root.find('[data-type="formula"]')

        this.$on('tableChangeFocus', () => {
            this.$formula.$el.focus()
        })

        this.$on('tableSelect', text => {
            this.$formula.text(text)
        })

        this.$on('tableChangeText', text => {
            this.$formula.text(text)
        })
    }
}

