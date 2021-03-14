const CODES = {
    'A': 65,
    'Z': 90
}

function createCells() {
    return `
    <div class="cell" contenteditable="true"></div>`
}

function createCols(value) {
    return `<div class="column">${value}</div>`
}

function createRow(info, cells) {
    return `
        <div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${cells.join('')}</div>
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
