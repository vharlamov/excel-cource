export function parse(value = '') {
    try {
        if (value.startsWith('=') && value.length > 2) {
            return eval(value.slice(1))
        }
    } catch (e) {
        return value
    }
    return value
}
