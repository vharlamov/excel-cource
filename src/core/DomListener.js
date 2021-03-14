/* eslint-disable quotes */
import {capitalize} from './utils'
import {$} from './dom'


export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root for DomListener')
        }

        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach( listener => {
            const method = getMethodName(listener)

            if (!this[method]) {
                const name = this.name || 'this'
                throw new Error(
             `Method ${method} not implemented in ${name} Component`)
            }

            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.remove(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    const name = 'on' + capitalize(eventName)
    return name
}
