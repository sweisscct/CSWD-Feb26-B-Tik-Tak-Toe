/*
    Minimum Viable Product
    - Try out/get feedback on our core features
    - We always have a working prototype to show off
    - We can test out new features as soon as possible

    Grid
    Symbol Placement
    Check game end
*/
// Single source of truth
// Self-documenting code
const maxPlayers = 2;
const numCols = 3;
const numRows = 3;


let currentPlayer = 0;
const symbols = ["X", "O"];

const cells = document.getElementsByTagName("td");

for (let cellNum = 0; cellNum<cells.length; cellNum++) {
    console.log(cellNum);
    cells[cellNum].addEventListener("click", (event) => {
        console.log("clicked");
        const currentCell = event.target;
        if (currentCell.innerText) return;
        currentCell.innerText = symbols[currentPlayer];
        checkGameEnd();
        currentPlayer++;
        currentPlayer = currentPlayer % maxPlayers;
    });
}

function checkGameEnd() {
    // check rows
    // check diagonals
    // check for empty cells

    // 0 1 2 
    // 3 4 5
    // 6 7 8

    // row++ -> index+numCols
    let isFull = true;
    for (let row=0; row<numRows; row++) {
        const rowStartIndex = row * numCols;
        const firstSymbol = cells[rowStartIndex].innerText;
        let isSameSymbol = true;
        if (!firstSymbol) {
            isFull = false;
            // isFull = !isFull;
            continue;
        }
        for (let col=0; col<numCols; col++) {
            const currentSymbol = cells[rowStartIndex+col].innerText;
            if (!currentSymbol) isFull = false;
            isSameSymbol = isSameSymbol && (firstSymbol === currentSymbol);
        }
        if (isSameSymbol) alert(`Player ${firstSymbol} has won!!`);
    } 
    if (isFull) alert(`The game is a draw`);
}