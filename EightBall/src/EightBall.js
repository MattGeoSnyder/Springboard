import React, { useState } from 'react';
import './EightBall.css';

const EightBall = ({answers=[
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" }
  ]}
    ) => {
        let [message, setMessage] = useState("Think of a question?");
        let [color, setColor] = useState('black');
        let [answered, setAnswered] = useState(false);
        function getAnswer(answers) {
            let idx = Math.floor(Math.random()*answers.length);
            let answer = answers[idx];
            setMessage(answer.msg);
            setColor(answer.color);
            setAnswered(true);
        }
        function reset() {
            setMessage("Think of a question");
            setColor('black');
            setAnswered(false);
        }
        return (
            <>
                <div id='eight-ball' style={{backgroundColor: color, color: 'white'}} onClick={() => getAnswer(answers)}>
                    {message}
                </div>
                {answered &&
                    <button onClick={reset}>Reset</button>}
            </>
        )

}

export default EightBall;