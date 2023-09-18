let ctrlKey = false;
let selectionStorage = []
let copiedData = []
let copyStartRow;
let copyEndRow;
let copyStartCol;
let copyEndCol;

const copyBtn = document.querySelector('.copy')
const pasteBtn = document.querySelector('.paste')
const cutBtn = document.querySelector('.cut')


document.addEventListener('keydown', (e) => {
    ctrlKey = e.metaKey
})

document.addEventListener('keyup', (e) => {
    ctrlKey = e.metaKey
})

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const { cellInDOM } = getCellAndCellProp(i, j)
        cellInDOM.addEventListener('click', (e) => {
            if (!ctrlKey) return;
            if (selectionStorage.length >= 2) {
                handleSelectedCellsUI(i, j)
                selectionStorage = []
            };

            cellInDOM.style.border = '2px solid green'
            selectionStorage.push({
                rowId: i,
                colId: j
            })
        })
    }
}

function handleSelectedCellsUI(row, col) {
    selectionStorage.forEach(({ rowId, colId }) => {
        const { cellInDOM } = getCellAndCellProp(rowId, colId)
        cellInDOM.style.border = '0.5px solid #D8D9DA'
    })
}

copyBtn.addEventListener('click', (e) => {
    if (selectionStorage.length < 2) return
    copiedData = []
    copyStartRow = Math.min(selectionStorage[0].rowId, selectionStorage[1].rowId)
    copyEndRow = Math.max(selectionStorage[0].rowId, selectionStorage[1].rowId)
    copyStartCol = Math.min(selectionStorage[0].colId, selectionStorage[1].colId)
    copyEndCol = Math.max(selectionStorage[0].colId, selectionStorage[1].colId)

    for (let i = copyStartRow; i <= copyEndRow && i <= 26; i++) {
        const copyRow = []
        for (let j = copyStartCol; j <= copyEndCol && j <= 100; j++) {
            copyRow.push(sheetDB[i][j])
        }
        copiedData.push(copyRow)
    }
    handleSelectedCellsUI()
})

cutBtn.addEventListener('click', (e) => {
    if (selectionStorage.length < 2) return
    copiedData = []
    copyStartRow = Math.min(selectionStorage[0].rowId, selectionStorage[1].rowId)
    copyEndRow = Math.max(selectionStorage[0].rowId, selectionStorage[1].rowId)
    copyStartCol = Math.min(selectionStorage[0].colId, selectionStorage[1].colId)
    copyEndCol = Math.max(selectionStorage[0].colId, selectionStorage[1].colId)

    for (let i = copyStartRow; i <= copyEndRow && i <= 26; i++) {
        const copyRow = []
        for (let j = copyStartCol; j <= copyEndCol && j <= 100; j++) {
            copyRow.push({ ...sheetDB[i][j] })
        }
        copiedData.push(copyRow)
    }

    for (let i = copyStartRow; i <= copyEndRow && i <= 26; i++) {
        for (let j = copyStartCol; j <= copyEndCol && j <= 100; j++) {
            const { cellInDOM, cellProp } = getCellAndCellProp(i, j);
            cellProp.bold = false
            cellProp.italic = false
            cellProp.underline = false
            cellProp.value = ""
            cellProp.bgColor = "#ffffff"
            cellProp.fontColor = "#000000"
            cellProp.fontWeight = '14'
            cellProp.bold = false
            cellProp.fontFamily = 'monospace'
            cellProp.allignment = 'left'
            cellInDOM.click()
        }
    }
    handleSelectedCellsUI()
})



pasteBtn.addEventListener('click', (e) => {

    const pasteStartRow = selectedRow;
    const pasteStartCol = selectedCol;
    const totalRows = copyEndRow - copyStartRow;
    const totalCols = copyEndCol - copyStartCol;
    const rowDeltaBetweenCopyAndPastePoint = copyStartRow - pasteStartRow
    const colDeltaBetweenCopyAndPastePoint = copyStartCol - pasteStartCol


    // for (let i = pasteStartRow; i <= (pasteStartRow + totalRows); i++) {
    //     for (let j = pasteStartCol; j <= (pasteStartCol + totalCols); j++) {
    //         const srcRow = i + rowDeltaBetweenCopyAndPastePoint
    //         const srcCol = j + colDeltaBetweenCopyAndPastePoint
    //         if (i < 100 && i >= 0 && j < 26 && j >= 0) {
    //             const { cellInDOM, cellProp } = getCellAndCellProp(i, j)
    //             const { value, bold, italic, underline, allignment, bgColor, fontColor, fontFamily, fontSize, } = { ...sheetDB[srcRow][srcCol] }
    //             cellProp.value = value
    //             cellProp.bold = bold;
    //             cellProp.italic = italic;
    //             cellProp.underline = underline;
    //             cellProp.allignment = allignment;
    //             cellProp.bgColor = bgColor;
    //             cellProp.fontColor = fontColor;
    //             cellProp.fontFamily = fontFamily;
    //             cellProp.fontSize = fontSize;
    //             console.log(cellInDOM, cellProp.value)
    //             cellInDOM.click()
    //         }
    //     }
    // }

    for (let i = pasteStartRow; i <= (pasteStartRow + totalRows); i++) {
        for (let j = pasteStartCol; j <= (pasteStartCol + totalCols); j++) {
            const srcRow = Math.abs(i - pasteStartRow)
            const srcCol = Math.abs(j - pasteStartCol)
            if (i < 100 && i >= 0 && j < 26 && j >= 0) {
                const { cellInDOM, cellProp } = getCellAndCellProp(i, j)
                const { value, bold, italic, underline, allignment, bgColor, fontColor, fontFamily, fontSize, } = { ...copiedData[srcRow][srcCol] }
                cellProp.value = value
                cellProp.bold = bold;
                cellProp.italic = italic;
                cellProp.underline = underline;
                cellProp.allignment = allignment;
                cellProp.bgColor = bgColor;
                cellProp.fontColor = fontColor;
                cellProp.fontFamily = fontFamily;
                cellProp.fontSize = fontSize;
                cellInDOM.click()
            }
        }
    }


})
