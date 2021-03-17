const CODES = {
    'A': 65,
    'Z': 90
}

function createCells(_, index) {
    return `
    <div class="cell" contenteditable="true" data-index="${index}"></div>`
}

function createCols(value, index) {
    return `<div class="column" data-type="resizable" data-index="${index}">
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
        : 'head-row'
    return `
        <div class="row ${head}" data-type="resizable">
            <div class="row-info">
            ${info}
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

export function createTable(rowsCount = 25) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill()
        .map(toChar)
        .map(createCols)
        
    rows.push(createRow('', cols))

    for (let i=0; i<rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill()
        .map(createCells)

        rows.push(createRow(i+1, cells))
    } 
    return rows.join('')
}

