import { storage, storageName } from "../core/utils"

export function applyTableState($root, state, param) {
    const cols = state.colState
        ? Object.entries(state.colState)
        : []
    const rows = state.rowState
        ? Object.entries(state.rowState)
        : []
    const cellsData = state.dataState
        ? Object.entries(state.dataState)
        : []

    const cellsStyle = state.styleState
        ? Object.entries(state.styleState)
        : []

    storage(storageName(param), {})
    storage(storageName(param), state)

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

export function applyHeaderState($root, state) {
    const headerText = state.headerState || 'Без названия'

    const headerEl = $root.find('input')
    headerEl.$el.value = headerText
}
