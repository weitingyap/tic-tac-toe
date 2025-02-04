// Player factory
function createPlayer(name, playerNum){
    let score = 0;

    const updateScore = () => {score++};
    const getScore = () => score;

    return {name, playerNum, getScore, updateScore};
}

// IIFE game module
const game = (function(){
    // create player instances
    const players = [createPlayer("One", 1), createPlayer("Two", 2)];

    // create and initialize board
    let board;

    const initBoard = function(){
        // 0 means empty, 1 is player 1, 2 is player 2
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }

    initBoard();


    // turn counter which has value set to playerNum of next player
    let [currPlayer, nextPlayer] = [1, 2];

    const getCurrPlayer = function(){
        return currPlayer;
    }

    const placeMove = function(x, y){
        board[x][y] = currPlayer;                           // update board
        if (checkWin()){                                    // in case of win, update score and reset board
            players[currPlayer-1].updateScore();
            initBoard();
            displayController.resetBoard();
        } else if (checkDraw()){                            // in case of draw, reset board
            initBoard;
            displayController.resetBoard();
        }
        [currPlayer, nextPlayer] = [nextPlayer, currPlayer] // update next player
    };


    // check for wins
    const checkWin = function(){
        
        function checkHorizontal(){
            return (board.some((row)=>{
                return row.every((cell)=>{
                    return cell === currPlayer});
            }));
        }

        function checkVertical(){
            for (let y = 0; y < 3; y++){
                let colMoveCnt = 0;
                for (let x = 0; x < 3; x++){
                    if (board[x][y] === currPlayer) colMoveCnt++;
                }
                if (colMoveCnt === 3) return true;
            }
            return false;
        }

        function checkDiagonal(){
            return (
                (board[0][0] === currPlayer && board[1][1] === currPlayer && board[2][2] === currPlayer) ||
                (board[0][2] === currPlayer && board[1][1] === currPlayer && board[2][0] === currPlayer)
            );
        }

        return (checkHorizontal() || checkVertical() || checkDiagonal());
    };

    // check if the board is full - if so, there is a draw; reset the board

    const checkDraw = function(){
        return !board.some( (row) => row.some((cell)=>cell===0) );
    }

    return {board, players, placeMove, getCurrPlayer};
})();

// IIFE display module
const displayController = (function(){

    const boardContainer = document.querySelector("#game-board-container");

    const initBoard = function(){
        const board = document.createElement("div");
        board.classList.add("board");
        const row = document.createElement("div");
        row.classList.add("row");
        const cell = document.createElement("div");
        cell.classList.add("cell");

        for (let x = 0; x < 3; x++){
            const newRow = row.cloneNode();
            console.log(`newrow is ${row} cloned into ${newRow}`);
            for (let y = 0; y < 3; y++){
                const newCell = cell.cloneNode(true);
                newCell.id = `cell-${x}-${y}`; // track each cell's coordinates
                newRow.appendChild(newCell);
            }
            board.appendChild(newRow);
        }

        boardContainer.appendChild(board);
    };

    // clears all moves made
    const resetBoard = function(){
        cells = document.querySelectorAll(".cell");
        cells.forEach(
            (cell)=>{cell.classList.remove("player-one-move", "player-two-move")}
        );
    };

    // function that listens for a click and places a move
    boardContainer.addEventListener('click', function placeMove(e){
        if (e.target.classList.contains('cell')){
            switch (game.getCurrPlayer()){
                case 1:
                    e.target.classList.add('player-one-move');
                    break;
                case 2:
                    e.target.classList.add('player-two-move');
                    break;
            }
            const [_, x, y] = e.target.id.split('-');
            game.placeMove(x,y);
            console.log(`placed move at ${{x,y}}, next player ${game.getCurrPlayer()}`);
        }
    });

    return {initBoard, resetBoard};
}(document));

displayController.initBoard();