export function capitalize(string) {
    if (typeof string !== 'string') return ''

    return string[0].toUpperCase() + string.slice(1)
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    
    return a === b
}

export function toDashStyle(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function isStyles(styles) {
    let isStyle = false

    for (let value of Object.values(styles)) {
        if (value) isStyle = true
    }

    return isStyle
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function storageName(param) {
    return `excel:${param}`
  }  
