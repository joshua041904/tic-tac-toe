
const statusDisplay = document.querySelector('.game-status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {  
        //.target identifies which cell was clicked 
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
    
        //don't do anything if the cell has already been used or if the game is over
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
   
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        if(gameActive){
            oTurn();
        }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    //update gameState with the position the player picked
    gameState[clickedCellIndex] = currentPlayer;
    //display either an X or O on the clicked cell
    clickedCell.innerHTML = currentPlayer;
}

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}  


function oTurn(){
    //retrieve all the cell elements
    const cells = document.querySelectorAll('.cell');

    //create an array of the indexes or remaining playable positions
    let remainingCellsIndexes = [];
    gameState.forEach((position, index) => {
        if(position === ""){ //position is empty
            remainingCellsIndexes.push(index); //push the index of the empty position
        }
    });

    //there are no empty positions left
    if(remainingCellsIndexes.length === 0){
        return;
    }

    //choose a random empty position on the game board
    let randomIndex = Math.floor(Math.random() * ((remainingCellsIndexes.length-1) - 0 + 1)) + 0;
    let actualIndex = remainingCellsIndexes[randomIndex];

    // if(currentPlayer === "O"){
    //     let foundPosition = false;
    //     while(!foundPosition){
    //         let randomIndex = Math.floor(Math. random()*10);
    //         if(gameState[randomIndex] != "") { //randomly selected position is empty
    //             foundPosition = true;
    //         }
    //     }
    // }

    const selectedCell = cells[actualIndex];

    //update gameState with the position the computer picked
    gameState[actualIndex] = "O";
    //display either an O on the clicked cell
    selectedCell.innerHTML = "O";

    handleResultValidation(); //will change current player back to X if necessary
}