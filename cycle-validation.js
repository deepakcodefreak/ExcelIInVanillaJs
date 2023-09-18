// Graph Storage

const collectionGraphComponenets = []
let graphComponents = []
for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
        // We are mainting array, because of a cell can have mutiple dependends(child)
        row.push([])
    }
    graphComponents.push(row)
}

function isGraphCyclic() {
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


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (visited[row][col] === false) {
                const cycleDeteced = dfsGraphCycleDetection(row, col, visited, pathVisited)
                if (cycleDeteced) {
                    return {
                        row,
                        col
                    }
                };
            }
        }
    }

    return null;

}

function dfsGraphCycleDetection(row, col, visited, pathVisited) {
    visited[row][col] = true
    pathVisited[row][col] = true
    for (let cellIndex = 0; cellIndex < graphComponents[row][col].length; cellIndex++) {
        const cell = graphComponents[row][col][cellIndex]
        const cellRow = cell.row
        const cellCol = cell.col
        if (visited[cellRow][cellCol] === false) {
            const response = dfsGraphCycleDetection(cellRow, cellCol, visited, pathVisited)
            if (response) return true;
        } else if (pathVisited[cellRow][cellCol] === true) {
            // cycle detected
            return true;
        }
    }

    pathVisited[row][col] = false
    return false;
}