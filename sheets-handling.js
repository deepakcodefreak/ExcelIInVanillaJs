
const sheetAddBtn = document.querySelector('.sheet-add-icon')
const sheetsFolderContainer = document.querySelector('.sheets-folder-container')

sheetAddBtn.addEventListener('click', () => {
    const sheetFolder = document.createElement('div')
    sheetFolder.setAttribute('class', 'sheet-folder');
    const sheetFoldersList = document.getElementsByClassName('sheet-folder')
    sheetFolder.setAttribute('id', sheetFoldersList.length)
    sheetFolder.innerHTML = `
        <div class="sheet-content">
            Sheet ${sheetFoldersList.length + 1}
        </div>
    `
    sheetsFolderContainer.appendChild(sheetFolder)
    sheetFolder.scrollIntoView()
    createSheetDB();
    createGraphComponents()
    handleSheetActiveNess(sheetFolder)
    handleSheetRemoval(sheetFolder)
    sheetFolder.click()
})

function handleSheetRemoval(sheet) {
    sheet.addEventListener('mousedown', (e) => {
        if (e.button !== 2) { // means right click
            return;
        }
        const sheetFoldersList = document.getElementsByClassName('sheet-folder')
        if (sheetFoldersList.length === 1) {
            alert("Minimum one sheet is required")
            return;
        }

        const response = confirm("Are you sure, you want to delete this sheet")
        if (response === false) {
            return;
        }

        const sheetIdx = Number(sheet.getAttribute('id'))

        // DB
        collectionSheetDB.splice(sheetIdx, 1)
        collectionGraphComponenets.splice(sheetIdx, 1)

        // UI
        handleSheetUIRemoval(sheet)

        // by defualt bring sheet 1 to active state
        sheetDB = collectionSheetDB[0]
        graphComponents = collectionGraphComponenets[0]
        handleSetProperties();

    })
}

function handleSheetUIRemoval(sheet) {
    sheet.remove()
    const sheetFoldersList = document.querySelectorAll('.sheet-folder')
    sheetFoldersList.forEach((sheet, index) => {
        sheet.setAttribute('id', index)
        sheet.innerHTML = `
        <div class="sheet-content">
                Sheet ${index + 1}
        </div>`
        sheet.style.background = 'transparent'
    })
    sheetFoldersList[0].style.background = 'gray'
}

function handleSheetDB(sheetIdx) {
    sheetDB = collectionSheetDB[sheetIdx]
    graphComponents = collectionGraphComponenets[sheetIdx]
}

function handleActiveSheetUI(sheet) {
    const sheetFoldersList = document.querySelectorAll('.sheet-folder')
    sheetFoldersList.forEach((sheetFolder) => {
        sheetFolder.style.background = 'transparent'
    })
    sheet.style.background = 'gray'
}

function handleSheetActiveNess(sheet) {
    sheet.addEventListener('click', () => {
        const sheetIdx = Number(sheet.getAttribute('id'))
        handleSheetDB(sheetIdx)
        handleSetProperties()
        handleActiveSheetUI(sheet)
    })
}

function handleSetProperties() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const { cellInDOM } = getCellAndCellProp(i, j)
            cellInDOM.click()
        }
    }

    const { cellInDOM: firstCell } = getCellAndCellProp(0, 0)
    firstCell.click()
}


function createGraphComponents() {
    let graphComponents = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            // We are mainting array, because of a cell can have mutiple dependends(child)
            row.push([])
        }
        graphComponents.push(row)
    }
    collectionGraphComponenets.push(graphComponents)
}

function createSheetDB() {
    const sheetDB = []

    for (let i = 0; i < rows; i++) {
        const sheetRow = [];
        for (let j = 0; j < cols; j++) {
            const colProps = {
                fontSize: '14',
                fontFamily: 'monospace',
                fontColor: '#000000',
                bgColor: '#ffffff',
                bold: false,
                italic: false,
                underline: false,
                allignment: 'left',
                value: '',
                formula: '',
                children: [],
                backgroundColor: '#ffffff'
            }
            sheetRow.push(colProps)
        }
        sheetDB.push(sheetRow)
    }
    collectionSheetDB.push(sheetDB)
}