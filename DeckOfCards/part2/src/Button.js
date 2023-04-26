import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api';

const Button = ({deck, setCards}) => {
    const[draw, setDraw] = useState(false);
    const [remaining, setRemaining] = useState(52);
    const interval = useRef();

    const drawCard = async () => {
        setRemaining(count => count - 1);
        if(remaining === 0) {
            setDraw(false);
            alert("Error: No cards reamaining");
            return;
        }

        let res = await axios.get(`${BASE_URL}/deck/${deck}/draw`);
        let card = res.data.cards[0];
        setCards((cards) => [...cards, card]);
    }

    useEffect(() => {

        
        if (draw) {
            interval.current = setInterval(() => {
                drawCard()
            }, 1000);    
        } else {
            clearInterval(interval.current);
        }
        return () => clearInterval(interval.current);
    }, [draw])

    const handleClick = (e) => {
        setDraw(!draw);
    }


    return (
        <button onClick={handleClick}>{draw ? 'STOP': 'START'} DRAWING!</button>
    )
}

export default Button;