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

    const placeMove = function(x, y, playerNum){
        board[x][y] = playerNum;
    };

    playerOne = createPlayer("One", 1);
    playerTwo = createPlayer("Two", 2);

    return {board, placeMove};
})();