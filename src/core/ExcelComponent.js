import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)

    this.name = options.name
    this.observer = options.observer

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
