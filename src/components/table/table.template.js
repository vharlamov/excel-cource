const CODES = {
    'A': 65,
    'Z': 90
}

function createCells(row) {
    return function(_, cell) {
        return `
        <div class="cell" 
            contenteditable="true" 
            data-type = "cell" 
            data-col="${cell}" 
            data-id="${row}:${cell}"
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
        : 'head-row'

    const rowNum = info
        ? info
        : ''

    return `
        <div class="row ${head}" data-type="resizable">
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

export function createTable(rowsCount = 25) {
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
        .map(createCells(row))

        rows.push(createRow(row+1, cells))
    } 
    return rows.join('')
}

