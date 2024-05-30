import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api';

const Button = ({deck, setCards}) => {
    const[draw, setDraw] = useState(false);
    const [remaining, setRemaining] = useState(52);
    const interval = useRef();

    useEffect(() => {

        const drawCard = async () => {
            setRemaining(count => count - 1);
            console.log(remaining);
            if(remaining > 0) {
                try {
                    let res = await axios.get(`${BASE_URL}/deck/${deck}/draw`);
                    let card = res.data.cards[0];
                    let image = card.image
                    setCards((cards) => [...cards, card]);    
                } catch(error) {
                    return;
                }
            } else {
                //This code is not running even when remaining is < 0
                setDraw(false);
                alert("Error: No cards remaining");
                return;    
            }
    
        }  

        if (draw) {
            interval.current = setInterval(() => {
                drawCard()
            }, 1000);    
        } else {
            clearInterval(interval.current);
        }
        return () => clearInterval(interval.current); 
    }, [draw, remaining])

    const handleClick = (e) => {
        setDraw(!draw);
    }


    return (
        <button onClick={handleClick}>{draw ? 'STOP': 'START'} DRAWING!</button>
    )
}

export default Button;