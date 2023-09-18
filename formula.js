

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.querySelector(`[rid="${i}"][cid="${j}"]`)
        cell.addEventListener('blur', () => {
            const { cellProp, cellInDOM } = getCellAndCellProp(selectedRow, selectedCol)
            const enteredData = cellInDOM.value;
            if (cellProp.value === cellInDOM.value) return;
            cellProp.value = enteredData;
            removeChildFromParent(cellProp.formula)
            updateChildrenCells(cellProp);
            cellProp.formula = ""
        })
    }
}

function updateChildrenCells(parentCellProp) {
    if (parentCellProp.children && parentCellProp.children.length === 0) {
        return;
    }
    parentCellProp.children.forEach((child) => {
        const charCodeAtZerothIndex = child.charCodeAt(0)
        const col = charCodeAtZerothIndex - 65;
        const row = parseInt(child.slice(1)) - 1;
        const { cellProp: childCellProp, cellInDOM: childCellInDOM } = getCellAndCellProp(row, col);
        childCellProp.value = evaluateFormula(childCellProp.formula)
        childCellInDOM.value = childCellProp.value
        updateChildrenCells(childCellProp)
    })
}



formulaBar.addEventListener('keydown', async (e) => {
    const formulaValue = formulaBar.value;
    if (e.key === 'Enter' && formulaBar) {

        // check if formula is changed, break P-C relations and create new P-C relation based on new formula
        const { cellProp } = getCellAndCellProp(selectedRow, selectedCol);
        if (formulaValue !== cellProp.formula) {
            removeChildFromParent(cellProp.formula)
        }

        // before evlating formula, make sure it's not a cyclic
        childInGraphComponentHOF(formulaValue, addChildToGraph)
        const cycleStartNode = isGraphCyclic()
        if (cycleStartNode) {
            let response = confirm('Cycle detected in your formula, do you want to trace path ? ')
            while (response) {
                await isGraphCyclicPathTrace(cycleStartNode.row, cycleStartNode.col)
                response = confirm('Cycle detected in your formula, do you want to trace path ? ')
            }
            childInGraphComponentHOF(formulaValue, removeChildFromGraph)
            return;
        }

        const evaluatedValue = evaluateFormula(formulaValue);
        setCellUIAndCellProp(evaluatedValue, formulaValue);
        addChildToParent(formulaValue)
        updateChildrenCells(cellProp)
    }
})

function childInGraphComponentHOF(formulaValue, cb) {
    formulaValue.split(' ').forEach((identifier) => {
        const charCodeAtZerothIndex = identifier.charCodeAt(0)
        if (charCodeAtZerothIndex >= 65 && charCodeAtZerothIndex <= 90) {
            const col = charCodeAtZerothIndex - 65;
            const row = parseInt(identifier.slice(1)) - 1;
            cb(row, col);
        }
    })
}

function removeChildFromGraph(row, col) {
    graphComponents[row][col].pop();
}

function addChildToGraph(pRow, pCol) {
    graphComponents[pRow][pCol].push(
        {
            row: selectedRow,
            col: selectedCol
        }
    )
}

function removeChildFromParent(formulaValue) {
    formulaValue.split(' ').forEach((identifier) => {
        const charCodeAtZerothIndex = identifier.charCodeAt(0)
        if (charCodeAtZerothIndex >= 65 && charCodeAtZerothIndex <= 90) {
            const col = charCodeAtZerothIndex - 65;
            const row = parseInt(identifier.slice(1)) - 1;
            const { cellProp } = getCellAndCellProp(row, col);
            const idx = cellProp.children.indexOf(addressBar.value);
            cellProp.children = [...cellProp.children.slice(0, idx), ...cellProp.children.slice(idx + 1)]
        }
    })
}

function addChildToParent(formulaValue) {
    formulaValue.split(' ').forEach((identifier) => {
        const charCodeAtZerothIndex = identifier.charCodeAt(0)
        if (charCodeAtZerothIndex >= 65 && charCodeAtZerothIndex <= 90) {
            const col = charCodeAtZerothIndex - 65;
            const row = parseInt(identifier.slice(1)) - 1;
            const { cellProp: parentCellProp } = getCellAndCellProp(row, col);
            parentCellProp.children.push(addressBar.value)
        }
    })
}

function evaluateFormula(formula) {
    let evaluatedFormula = formula.split(" ");
    evaluatedFormula.forEach((identifier, index) => {
        const charCodeAtZerothIndex = identifier.charCodeAt(0)
        if (charCodeAtZerothIndex >= 65 && charCodeAtZerothIndex <= 90) {
            const col = charCodeAtZerothIndex - 65;
            const row = parseInt(identifier.slice(1)) - 1;
            const { cellProp } = getCellAndCellProp(row, col);
            evaluatedFormula[index] = cellProp.value;
        }
    })
    evaluatedFormula = evaluatedFormula.join(" ");
    return eval(evaluatedFormula)
}

function setCellUIAndCellProp(evaluatedValue, formula) {
    const { cellInDOM, cellProp } = getCellAndCellProp(selectedRow, selectedCol);
    // update cell ui
    cellInDOM.value = evaluatedValue;
    // upadate DB
    cellProp.value = evaluatedValue
    // update formula field in DB
    cellProp.formula = formula;
}

function getCellAndCellProp(selectedRow = 0, selectedCol = 0) {
    const cellProp = sheetDB[selectedRow][selectedCol];
    const cellInDOM = document.querySelector(`[rid="${selectedRow}"][cid="${selectedCol}"]`)
    return { cellProp, cellInDOM }
}