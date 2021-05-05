import {$} from '../../core/dom'
import { Observer } from '../../core/Observer'
import { StoreSubscriber } from '../../core/StoreSubscriber'
import * as actions from '../../redux/actions'
import { applyHeaderState, applyTableState } from '../../redux/applyState'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.observer = new Observer
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    this.$root = $.create('div', 'excel')

    const componentOptions = {
      observer: this.observer,
      store: this.store
    }

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html(component.toHTML())
      this.$root.append($el)
      return component
    });

    return this.$root
  }

  init(params) {
    const state = this.store.getState()

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())

    applyTableState(this.$root, state, params)
    applyHeaderState(this.$root, state, params)

    this.store.dispatch(actions.clearState())
    this.store.dispatch(actions.updateDate())
  }

  destroy() {
    this.subscriber.unSubscribeFromStore()
    this.components.forEach(component => component.destroy());
  }
}
