$form = $("form");
scoreSection = document.querySelector('#score-section')
timerSection = document.querySelector('#timer')

let score = 0;
let time = 60;
scoreSection.innerText = `${score}`

timerSection.addEventListener('DOMContentLoaded',function(e){
    setInterval(function() {
        time -= 1;
        timerSection.innerText = `${time}`;
    }, 1000);
})

$form.on('submit', async function(e){
    e.preventDefault()
    let guess = $form.find('input').val();
    let req = await sendAxiosReq(guess);
    updateResultSection(req.data['result']);
    updateScoreSection(req.data['result'], guess);
    $form.find('input').val("");
});

async function sendAxiosReq(answer){
    req = await axios.post('/answer', {answer});
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


