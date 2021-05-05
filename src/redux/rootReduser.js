import { parseId, unParse } from "../components/table/table.functions"
import { 
    APPLY_STYLES, 
    CHANGE_HEADER, 
    CHANGE_STYLES, 
    CHANGE_TEXT, 
    CLEAR_STATE, 
    CLEAR_STYLES, 
    FORMULA, 
    SORT_ROWS, 
    TABLE_RESIZE, 
    UPDATE_DATE
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
        case UPDATE_DATE:
            field = 'openedDate'
            return {
                ...state,
                [field]: new Date(Date.now()).toLocaleDateString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
        case CLEAR_STATE:
            const fields = ['formulaState', 'dataState']
            
            return clearState(state, fields)
        case CLEAR_STYLES:
            for (let id of action.data) {
               delete state.styleState[id]
            }
            return state
        case SORT_ROWS:
            const fieldsToSort = [
                'formulaState', 
                'dataState', 
                'styleState', 
                'rowState'
            ]
            const newState = {}
            const sortType = action.data.sortType

            state[sortType] = state[sortType]
                ? toggle[state[sortType]] 
                : 'asc'

            for (let field of fieldsToSort) {
                newState[field] = sort(state, field, action)
            }

            return {
                ...state,
                ...newState
            }
        default: return state
    }
}

const toggle = {
    'asc': 'desc',
    'desc': 'asc'
}

function sort(state, field, action) {
    const sequence = action.data.sequence
    const items = Object.entries(state[field])
    const newField = {}

    for (let i=0; i<sequence.length; i++) {
        for (let [id, value] of items) {
            const parsed = parseId(id)

            if (sequence[i] === parsed[0]) {
                parsed[0] = i
                newField[unParse(parsed)] = value
            }
        }
    }
    return newField
}

function value(state, field, action) {
    const val = state[field] || {}
    const id = action.data.id

    if (typeof action.data.value === 'object') {
        const [[key, value]] = Object.entries(action.data.value)
        id.forEach(id => val[id] = ({...val[id], [key]: value}))
        return val
    }
    if (typeof id === 'object') {
        id.forEach(id => val[id] = action.data.value)
        return val
    }

    val[id] = action.data.value
    return val
}

function clearState(state, fields) {
    for (let field of fields) {
        const busyValues = state[field]
        ? Object.entries(state[field])
        : []

        for (let [key, value] of busyValues) {
            if (!value) {
                delete state[field][key]
            }
        }
    }

    return state
}
