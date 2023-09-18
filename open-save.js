const downloadBtn = document.querySelector('.download')
const uploadBtn = document.querySelector('.upload')

downloadBtn.addEventListener('click', (e) => {
    const jsonData = JSON.stringify([sheetDB, graphComponents])
    const file = new Blob([jsonData], { type: "application/json" })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})


uploadBtn.addEventListener('click', (e) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.click()

    input.addEventListener('change', () => {
        const fr = new FileReader()
        const files = input.files
        const fileObj = files[0]

        fr.readAsText(fileObj)
        fr.addEventListener('load', () => {
            const fileData = JSON.parse(fr.result)

            sheetAddBtn.click()

            sheetDB = fileData[0]
            graphComponents = fileData[1]
            collectionSheetDB[collectionSheetDB.length - 1] = fileData[0]
            collectionGraphComponenets[collectionGraphComponenets.length - 1] = fileData[1]
            handleSetProperties()
        })
    })

})