import { defaultHeader, defaultStyles } from "../constants"
import { storage } from "../core/utils"

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {}, // {'0:1': 'text'}
    currentText: '',
    currentStyles: defaultStyles,
    styleState: {},
    headerState: defaultHeader,
    formulaState: ''
}

export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
