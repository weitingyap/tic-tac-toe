function createPlayer(name){
    let score = 0;

    const updateScore = () => {score++};

    return {name, score, updateScore};
}

playerOne = createPlayer("One");
playerTwo = createPlayer("Two");