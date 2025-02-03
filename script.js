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

    playerOne = createPlayer("One", 1);
    playerTwo = createPlayer("Two", 2);

    return {board, placeMove};
})();