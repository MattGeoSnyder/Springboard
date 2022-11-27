let $form = $("form");
let scoreSection = document.querySelector('#score-section');
let timerSection = document.querySelector('#timer');
let highScoreSection = document.querySelector('#high-score');
let gamesPlayedSection = document.querySelector('#games-played');

let score = 0;
let time = 60;

scoreSection.innerText = `${score}`
timerSection.innerText = `${time}`

document.addEventListener('DOMContentLoaded',function(e) {
    let int_id = setInterval(async function() {
        if(time > 0){
            time -= 1;
            timerSection.innerText = `${time}`;    
        } else {
            $form.find('input').prop('disabled', true);
            $form.find('button').prop('disabled', true);    
            let req = await updateStats();
            console.log('hello');
            updateStatsBoard(req);
            clearInterval(int_id);
        }
    }, 1000);               
});


$form.on('submit', async function(e){
    e.preventDefault()
    let guess = $form.find('input').val();
    let req = await sendAnswer(guess);
    updateResultSection(req.data['result']);
    updateScoreSection(req.data['result'], guess);
    $form.find('input').val("");
});

async function sendAnswer(answer){
    let req = await axios.post('/answer', {answer});
    return req;
}

function updateResultSection(result){
    resultSection = document.querySelector("#result-section");
    resultSection.innerText = result;
}

function updateScoreSection(result, guess){
    updateScore(result, guess);
    scoreSection.innerText = `${score}`;
}

function updateScore(result, guess){
    if(result === 'ok'){
        score += guess.length;
    }
}

async function updateStats() {
    let req = await axios.post('/stats', {"score": score});
    return req;
}

function updateStatsBoard(req) {
    let stats = req.data;
    let highScore = stats['high_score'];
    let gamesPlayed = stats['games_played'];
    highScoreSection.innerText = `${highScore}`;
    gamesPlayedSection.innerText = `${gamesPlayed}`;
}


