class Game {
    timerId = 0;
    started = false;
    constructor(){
        this.score = 0;
        this.time = 60;
    }
    updateScore(result, guess){
        if(result === 'ok'){
            game.score += guess.length;
        }
    }
    async handleEndgame() {
        $form.find('input').prop('disabled', true);
        $form.find('button').prop('disabled', true);    
        let req = await this.updateStats();
        updateStatsBoard(req);
    }
    async handleTimer() {
        if(this.time > 0){
            this.time -= 1;
            timerSection.innerText = `${this.time}`;
        } else {
            clearInterval(this.timerId);
            await this.handleEndgame();
        }
    }
    async sendAnswer(answer){
        let req = await axios.post('/answer', {answer});
        return req;
    }
    async updateStats() {
        let req = await axios.post('/stats', {"score": game.score});
        return req;
    }
}

let game = new Game();

