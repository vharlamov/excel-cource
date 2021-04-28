import { defaultStyles } from "../../constants"
import { createStore } from "../../core/createStore"
import { storage, toDashStyle } from "../../core/utils"
import { rootReduser } from "../../redux/rootReduser"

const CODES = {
    'A': 65,
    'Z': 90
}
const store = createStore(rootReduser, storage('excel-state'))

function createCells(row, state) {
    return function(_, cell) {
        const id = `${row}:${cell}`
        const data = state.dataState
            ? state.dataState[id]
            : ''
        return `
        <div class="cell"
            contenteditable="true" 
            data-type = "cell" 
            data-col="${cell}" 
            data-id="${row}:${cell}"
            data-value="${data || ''}"
        ></div>` 
    }
}

function createCols(value, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
    ${value}
    <div class='col-resize' data-resize="col"></div>
    </div>`
}

function createRow(info, cells) {
    const resizer = info
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''

    const head = info
        ? ''
        : ' head-row'

    const rowNum = info
        ? info
        : ''

    return `
        <div class="row${head}" data-type="resizable" data-row="${info}">
            <div class="row-info">
            ${rowNum}
            ${resizer}
            </div>
            <div class="row-data" data-rowindex="${info}">
            ${cells.join('')}
            </div>
        </div>`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 25, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill()
        .map(toChar)
        .map(createCols)
        
    rows.push(createRow('', cols))

    for (let row=0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill()
        .map(createCells(row, state))

        rows.push(createRow(row+1, cells))
    } 
    return rows.join('')
}

