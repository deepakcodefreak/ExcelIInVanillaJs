function delay(milisecs = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, milisecs);
    })
}


async function isGraphCyclicPathTrace(row, col) {
    const visited = []
    const pathVisited = [];

    for (let i = 0; i < rows; i++) {
        const visitedRow = []
        const pathVisitedRow = []
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false)
            pathVisitedRow.push(false)
        }
        visited.push(visitedRow)
        pathVisited.push(pathVisitedRow)
    }

    const res = await dfsGraphCycleDetectionPathTrace(row, col, visited, pathVisited)
    if (res) return await Promise.resolve(true)

    return Promise.resolve(false)
}



async function dfsGraphCycleDetectionPathTrace(row, col, visited, pathVisited) {
    visited[row][col] = true
    pathVisited[row][col] = true

    const { cellInDOM } = getCellAndCellProp(row, col)
    cellInDOM.style.backgroundColor = 'lightblue'
    await delay(1000)


    for (let cellIndex = 0; cellIndex < graphComponents[row][col].length; cellIndex++) {
        const cell = graphComponents[row][col][cellIndex]
        const cellRow = cell.row
        const cellCol = cell.col
        if (visited[cellRow][cellCol] === false) {
            const response = await dfsGraphCycleDetectionPathTrace(cellRow, cellCol, visited, pathVisited)
            if (response) {
                cellInDOM.style.backgroundColor = 'transparent'
                await delay(1000)
                return Promise.resolve(true)
            }
        } else if (pathVisited[cellRow][cellCol] === true) {
            // cycle detected
            const { cellInDOM: cyclicCellInDOM } = getCellAndCellProp(cellRow, cellCol)
            cyclicCellInDOM.style.backgroundColor = 'orange'
            await delay(1000)
            cyclicCellInDOM.style.backgroundColor = 'transparent'
            cellInDOM.style.backgroundColor = 'transparent'
            await delay(1000)
            return Promise.resolve(true)
        }
    }

    pathVisited[row][col] = false
    return Promise.resolve(false);
}