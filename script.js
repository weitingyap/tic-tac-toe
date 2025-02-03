function createPlayer(name, playerNum){
    let score = 0;

    const updateScore = () => {score++};

    return {name, playerNum, score, updateScore};
}

const game = (function(){

    // 0 means empty, 1 is player 1, 2 is player 2
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // turn counter which has value set to playerNum of next player
    let nextPlayerNum = 1;

    const placeMove = function(x, y){
        board[x][y] = nextPlayerNum;                 // update board
        nextPlayerNum = nextPlayerNum === 1 ? 2 : 1; // update next player
    };

    const checkWin = function(){
        
        function checkHorizontal(){
            return (board.some((row)=>{
                return row.every((cell)=>{
                    return cell === nextPlayerNum});
            }));
        }

        function checkVertical(){
            for (let x = 0; x < 3; x++){
                let colMoveCnt = 0;
                for (let y = 0; y < 3; y++){
                    if (board[x][y] === nextPlayerNum) colMoveCnt++;
                }
                if (colMoveCnt === 3) return true;
            }
            return false;
        }

        function checkDiagonal(){
            return (
                (board[0][0] === nextPlayerNum && board[1][1] === nextPlayerNum && board[2][2] === nextPlayerNum) ||
                (board[0][2] === nextPlayerNum && board[1][1] === nextPlayerNum && board[2][0] === nextPlayerNum)
            );
        }

        return (checkHorizontal() || checkVertical() || checkDiagonal());
    };

    playerOne = createPlayer("One", 1);
    playerTwo = createPlayer("Two", 2);

    return {board, placeMove, checkWin};
})();