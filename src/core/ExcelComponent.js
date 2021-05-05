import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)

    this.name = options.name
    this.observer = options.observer
    this.subscribe = options.subscribe || []
    this.store = options.store

    this.unsubscribes = []

    this.prepare()
  }

  $emit(event, ...args) {
    this.observer.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.observer.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  toHTML() {
    return ''
  }

  prepare() {}

  init() {
    this.initDomListeners() 
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(item => item())
  }
}
