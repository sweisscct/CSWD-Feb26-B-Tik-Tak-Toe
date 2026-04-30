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

let XWins;
let OWins;
let numDraws;

const xData = localStorage.getItem("X");
if (xData) XWins = xData;
else XWins = 0;
document.getElementById("XWins").innerText = XWins;

const oData = localStorage.getItem("O");
if (oData) OWins = oData;
else OWins = 0;
document.getElementById("OWins").innerText = OWins;

const drawData = localStorage.getItem("Draws");
if (drawData) numDraws = drawData;
else numDraws = 0;
document.getElementById("numDraws").innerText = numDraws;

let currentPlayer;
let gridData;
const symbols = ["X", "O"];

let gameData = localStorage.getItem("Game Data");
if (gameData) {
    gameData = JSON.parse(gameData);
    currentPlayer = gameData["currentPlayer"];
}
else {
    currentPlayer = 0;
    gameData = {
        // "currentPlayer": currentPlayer,
        currentPlayer,
        gridData: [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    }
}

const cells = document.getElementsByTagName("td");
const timer = document.getElementById("timer");
let startTime = new Date();
function updateTimer() {
    timer.innerText = Math.round((new Date() - startTime)/1000);
}

let timerInterval = setInterval(updateTimer, 1000);

for (let cellNum = 0; cellNum<cells.length; cellNum++) {
    console.log(cellNum);
    cells[cellNum].innerText = gameData["gridData"][cellNum];
    cells[cellNum].addEventListener("click", (event) => {
        console.log("clicked");
        const currentCell = event.target;
        if (currentCell.innerText) return;
        currentCell.innerText = symbols[currentPlayer];
        gameData["gridData"][cellNum] = symbols[currentPlayer];
        console.log(gameData["gridData"]);
        checkGameEnd();
        currentPlayer++;
        currentPlayer = currentPlayer % maxPlayers;
        gameData["currentPlayer"] = currentPlayer;
        localStorage.setItem("Game Data", JSON.stringify(gameData));
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
        if (isSameSymbol) {
            clearInterval(timerInterval);
            if (firstSymbol === "X") {
                XWins++;
                localStorage.setItem("X", XWins);
            }
            else {
                OWins++; 
                localStorage.setItem("O", OWins);
            }
            alert(`Player ${firstSymbol} has won!!`);

        }
    } 
    if (isFull) {
        clearInterval(timerInterval);
        numDraws++;
        localStorage.setItem("Draws", numDraws);
        alert(`The game is a draw`);
    }
}




// setInterval(() => {

// }, 1000);

