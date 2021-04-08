import {ExcelComponent} from '@core/ExcelComponent';
import { $ } from '../../core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: [
                'input', 
                'keydown'],
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
        this.$emit('formulaText', $(event.target).text())
      }
    
    init() {
        super.init()

        this.$formula = this.$root.find('[data-type="formula"]')

        this.$on('tableText', text => {
            this.$formula.text(text)
        })

        this.$on('tableChangeFocus', () => {
            this.$formula.$el.focus()
        })

        this.$on('tableSelect', text => {
            this.$formula.text(text)
        })
    }
}

