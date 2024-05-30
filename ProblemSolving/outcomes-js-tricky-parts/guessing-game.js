function guessingGame() {
    let number = Math.floor(Math.random()*100)
    let gameOver = false;
    let count = 0;
    return function (guess) {
        count++;
        if (!gameOver) {
            if (guess === number) {
                gameOver = true;
                return `You win! You found ${number} in ${count} guesses.`;
            } else if (guess < number) {
                return `${guess} is too low!`;
            } else {
                return `${guess} is too high!`;
            }
        } else {
            return 'The game is over, you already won!';
        }
    }
}

module.exports = { guessingGame };
