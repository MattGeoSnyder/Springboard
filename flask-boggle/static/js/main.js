let $form = $("form");
let scoreSection = document.querySelector('#score-section');
let timerSection = document.querySelector('#timer');
let highScoreSection = document.querySelector('#high-score');
let gamesPlayedSection = document.querySelector('#games-played');


scoreSection.innerText = `Score: ${game.score}`
timerSection.innerText = `${game.time}`

function updateResultSection(result){
    resultSection = document.querySelector("#result-section");
    resultSection.innerText = result;
}

function updateScoreSection(result, guess){
    game.updateScore(result, guess);
    scoreSection.innerText = `Score: ${game.score}`;
}

function updateStatsBoard(req) {
    let stats = req.data;
    let highScore = stats['high_score'];
    let gamesPlayed = stats['games_played'];
    highScoreSection.innerText = `High Score: ${highScore}`;
    gamesPlayedSection.innerText = `Games Played: ${gamesPlayed}`;
}

$form.on('submit', async function(e){
    if(!game.started){
        game.started = true;
        game.timerId = setInterval(async function() {
            game.handleTimer.call(game)}
        , 1000);                   
    } 
})

$form.on('submit', async function(e){
    e.preventDefault()
    let guess = $form.find('input').val();
    let req = await game.sendAnswer(guess);
    updateResultSection(req.data['result']);
    updateScoreSection(req.data['result'], guess);
    $form.find('input').val("");
});
