export class Store {
    listeners = []

    constructor(rootReduser, initialState = {}) {
        this.rootReduser = rootReduser
        this.state = rootReduser({...initialState}, {type: '__INIT__'})
    }

    dispatch(action) {
        this.state = this.rootReduser(this.state, action)
        this.listeners.forEach(l => l(this.state))
    }

    subscribe(fn) {
        this.listeners.push(fn)
        return {
            unsubscribe() {
                this.listeners = this.listeners.filter(l => l !== fn)
            }
        }
    }

    getState() {
        return this.state
    }
}
