import {$} from '../../core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map((Component) => {
        const $el = $.create('div', Component.className)
        const component = new Component($el)

        $el.html(component.toHTML())
        $root.append($el)
        // console.log(component)
        return component
    });

    return $root
  }

  render() {
    // console.log(this.$el.html())
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init());
  }
}
