import { 
    APPLY_STYLES, 
    CHANGE_HEADER, 
    CHANGE_STYLES, 
    CHANGE_TEXT, 
    FORMULA, 
    TABLE_RESIZE 
} from "./types"

export function rootReduser(state, action) {
    let field
    
    switch (action.type) {
        case TABLE_RESIZE: 
            field = action.data.type === 'col'
                ? 'colState'
                : 'rowState'
            return {
                ...state, 
                [field]: value(state, field, action)
            }
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state, 
                [field]: value(state, field, action), 
                currentText: action.data.value
            }
        case CHANGE_STYLES:
            return {
                ...state, 
                currentStyles: action.data
            }
        case APPLY_STYLES:
            field = 'styleState'
            return {
                ...state, 
                [field]: value(state, field, action)
            }
        case CHANGE_HEADER:
            field = 'headerState'
            return {
                ...state,
                [field]: action.data
            }
        case FORMULA:
            field = 'formulaState'
            return {
                ...state,
                [field]: value(state, field, action)
            }

        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    const id = action.data.id

    if (typeof action.data.value === 'object') {
        const [[key, value]] = Object.entries(action.data.value)
        id.forEach(id => val[id] = ({...val[id], [key]: value}))
        return val
    }

    val[id] = action.data.value
    return val
}
