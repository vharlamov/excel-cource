import { storage } from "../core/utils"
import { initialState } from "./initialState"

const thisState = storage('excel-state')
    ? storage('excel-state')
    : initialState

export function applyTableState($root) {
    const cols = thisState.colState
        ? Object.entries(thisState.colState)
        : []
    const rows = thisState.rowState
        ? Object.entries(thisState.rowState)
        : []
    const cellsData = thisState.dataState
        ? Object.entries(thisState.dataState)
        : []

    const cellsStyle = thisState.styleState
        ? Object.entries(thisState.styleState)
        : []

    const formulaData = thisState.formulaState
    ? Object.entries(thisState.formulaState)
    : []

    for (let [key, value] of cellsData) {
        if (!value) {
            delete thisState.dataState[`${key}`]
            delete thisState.formulaState[`${key}`]
        }
    }

    for (let [key, value] of formulaData) {
        if (!value || !thisState.dataState[`${key}`]) {
            delete thisState.formulaState[`${key}`]
        }
    }

    storage('excel-state', {})
    storage('excel-state', thisState)

    for (let [key, value] of cols) {
        const entireCol = $root.findAll(`[data-col="${key}"]`)
        entireCol.forEach(cell => {
            cell.style.width = value + 'px'
        })
    }

    for (let [key, value] of rows) {
        const row = $root.find(`[data-row="${key}"]`)
        row.css({height: value + 'px'})
    }

    for (let [key, value] of cellsData) {
        const cell = $root.find(`[data-id="${key}"]`)
        cell.text(value)
    }

    for (let [key, value] of cellsStyle) {
        const cell = $root.find(`[data-id="${key}"]`)
        cell.css(value)
    }
}

export function applyHeaderState($root) {
    const headerText = thisState.headerState

    const headerEl = $root.find('input')
    headerEl.$el.value = headerText
}
