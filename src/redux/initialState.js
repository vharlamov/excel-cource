import { defaultHeader, defaultStyles } from "../constants"
import { storage } from "../core/utils"

export const defaultState = {
    colState: {},
    rowState: {},
    dataState: {}, 
    currentText: '',
    currentStyles: defaultStyles,
    styleState: {},
    headerState: defaultHeader,
    formulaState: '',
    openedDate: Date.now().toString(),
    sortNum: 'asc',
    sortABC: 'asc'
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeState(state) {
    return state ? normalize(state) : defaultState
}
