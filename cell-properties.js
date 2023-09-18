
// Storage

const collectionSheetDB = []

const activeColor = "#ffffff"
const inactiveColor = "transparent"

{
    sheetAddBtn.click();
}


// Selectors for cell properties


// Event listeners


bold.addEventListener('click', () => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.bold = !cellProp.bold
    cellInDOM.style.fontWeight = cellProp.bold ? "bold" : "normal"
    sheetDB[selectedRow][selectedCol] = cellProp;
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor
})


italic.addEventListener('click', () => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.italic = !cellProp.italic
    cellInDOM.style.fontStyle = cellProp.italic ? "italic" : "normal"
    sheetDB[selectedRow][selectedCol] = cellProp;
    italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor
})

underline.addEventListener('click', () => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.underline = !cellProp.underline
    cellInDOM.style.textDecoration = cellProp.underline ? "underline" : "none"
    sheetDB[selectedRow][selectedCol] = cellProp;
    underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor
})

allignment.forEach(allignElement => {
    allignElement.addEventListener('click', (e) => {
        const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
        cellProp.allignment = e.target.dataset.value;
        cellInDOM.style.textAlign = e.target.dataset.value;
        switch (e.target.dataset.value) {
            case "left":
                allignLeft.style.backgroundColor = activeColor
                allignCenter.style.backgroundColor = inactiveColor
                allignRight.style.backgroundColor = inactiveColor
                break;
            case "center":
                allignCenter.style.backgroundColor = activeColor
                allignLeft.style.backgroundColor = inactiveColor
                allignRight.style.backgroundColor = inactiveColor
                break;
            case "right":
                allignRight.style.backgroundColor = activeColor
                allignLeft.style.backgroundColor = inactiveColor
                allignCenter.style.backgroundColor = inactiveColor
                break;
        }
        sheetDB[selectedRow][selectedCol] = cellProp;
    })
});


fontSize.addEventListener('change', (e) => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.fontSize = e.target.value;
    cellInDOM.style.fontSize = e.target.value + 'px';
    sheetDB[selectedRow][selectedCol] = cellProp;
})

fontFamily.addEventListener('change', (e) => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.fontFamily = e.target.value;
    cellInDOM.style.fontFamily = e.target.value;
    sheetDB[selectedRow][selectedCol] = cellProp;
})

fontColorProp.addEventListener('change', (e) => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.fontColor = e.target.value;
    cellInDOM.style.color = e.target.value
    sheetDB[selectedRow][selectedCol] = cellProp;
})

bgColorProp.addEventListener('change', (e) => {
    const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
    cellProp.bgColor = e.target.value;
    cellInDOM.style.backgroundColor = e.target.value
    sheetDB[selectedRow][selectedCol] = cellProp;
})



function getCellAndCellProp(selectedRow = selectedRow, selectedCol = selectedCol) {
    const cellProp = sheetDB[selectedRow][selectedCol];
    const cellInDOM = document.querySelector(`[rid="${selectedRow}"][cid="${selectedCol}"]`)
    return { cellProp, cellInDOM }
}