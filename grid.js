let cols = 26;
let rows = 100;
let selectedRow = 0;
let selectedCol = 0;

const bold = document.querySelector('.bold')
const italic = document.querySelector('.italic')
const underline = document.querySelector('.underline')
const fontSize = document.querySelector('.font-size')
const fontFamily = document.querySelector('.font-family')
const fontColorProp = document.querySelector('.font-color-prop')
const bgColorProp = document.querySelector('.bg-color-prop')
const allignment = document.querySelectorAll('.allignment')
const formulaBar = document.querySelector('.formula-bar');
const allignLeft = allignment[0]
const allignCenter = allignment[1]
const allignRight = allignment[2]
let sheetDB = []



let addressColsContainer = document.getElementById('address-cols-container');
let addressRowsContainer = document.getElementById('address-rows-container')
let gridCells = document.querySelector('.grid-cells')
let gridContainer = document.querySelector('.grid-container')
let addressBar = document.querySelector('.address-bar')


for (let i = 0; i < cols; i++) {
    const colAddressCell = document.createElement('div')
    colAddressCell.innerText = String.fromCharCode("A".charCodeAt(0) + i);
    colAddressCell.setAttribute('class', 'col-address-cell')
    addressColsContainer.appendChild(colAddressCell)
}


for (let i = 0; i < rows; i++) {
    const rowAddressCell = document.createElement('div')
    rowAddressCell.innerText = i + 1
    rowAddressCell.setAttribute('class', 'row-address-cell')
    addressRowsContainer.appendChild(rowAddressCell)
}

for (let i = 0; i < rows; i++) {
    const cellsRow = document.createElement('div')
    cellsRow.setAttribute('class', 'grid-cells-row')
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('input')
        cell.setAttribute('class', 'grid-cell')
        cell.setAttribute('rid', i)
        cell.setAttribute('cid', j)
        cell.addEventListener('click', () => {
            addressBar.value = String.fromCharCode("A".charCodeAt(0) + j) + (i + 1);
            selectedRow = i;
            selectedCol = j;
            const cellProp = sheetDB[selectedRow][selectedCol]
            bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor
            italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor
            underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor
            allignLeft.style.backgroundColor = cellProp.allignment === "left" ? activeColor : inactiveColor;
            allignRight.style.backgroundColor = cellProp.allignment === "right" ? activeColor : inactiveColor;
            allignCenter.style.backgroundColor = cellProp.allignment === "center" ? activeColor : inactiveColor;
            fontColorProp.value = cellProp.fontColor
            bgColorProp.value = cellProp.backgroundColor
            fontFamily.value = cellProp.fontFamily
            fontSize.value = cellProp.fontSize
            formulaBar.value = cellProp.formula;
            cell.value = cellProp.value
            cell.style.backgroundColor = cellProp.bgColor
            cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
            cell.style.fontstyle = cellProp.italic ? "italic" : "normal"
            cell.style.textDecoration = cellProp.underline ? "underline" : ""
            cell.style.color = cellProp.fontColor
            cell.style.textAlign = cellProp.allignment
            cell.style.fontFamily = cellProp.fontFamily
            cell.style.fontSize = cellProp.fontSize
        })
        cellsRow.appendChild(cell)
    }
    gridCells.appendChild(cellsRow)
}
