// Player factory
function createPlayer(name, playerNum){
    let score = 0;

    const updateScore = () => {score++};
    const getScore = () => score;

    return {name, playerNum, getScore, updateScore};
}

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

    const placeMove = function(x, y){
        board[x][y] = currPlayer;                           // update board
        if (checkWin()){                                    // in case of win, update score and reset board
            players[currPlayer-1].updateScore();
            initBoard();
        } else if (checkDraw()){                            // in case of draw, reset board
            initBoard;
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
            for (let x = 0; x < 3; x++){
                let colMoveCnt = 0;
                for (let y = 0; y < 3; y++){
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

    return {board, players};
})();

const displayController = (function(){
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
                newRow.appendChild(newCell);
            }
            board.appendChild(newRow);
        }

        boardContainer = document.querySelector("#game-board-container");
        boardContainer.appendChild(board);
    };

    return {initBoard};
}(document));

displayController.initBoard();