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
    let [currPlayer, nextPlayer] = [1, 2];

    const placeMove = function(x, y){
        board[x][y] = currPlayer;                           // update board
        [currPlayer, nextPlayer] = [nextPlayer, currPlayer] // update next player
    };

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

    const players = [createPlayer("One", 1), createPlayer("Two", 2)];

    return {board, placeMove, checkWin};
})();