import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './Card';
import Button from './Button';
import './Deck.css';

const Deck = () => {
    const BASE_URL = 'https://deckofcardsapi.com/api';
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [draw, setDraw] = useState(false);
    const [remaining, setRemaining] = useState(52);
    const interval = useRef();


    useEffect(() => {
        async function loadDeck() {
            let res = await axios.get(`${BASE_URL}/deck/new/shuffle`);
            setDeck(res.data.deck_id);
        }
        loadDeck();
    }, []);

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
                    console.log(cards);
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
    }, [draw])

    const handleClick = (e) => {
        setDraw(!draw);
    }

    return (
        <div>
            <button onClick={handleClick}>{draw ? 'STOP': 'START'} DRAWING!</button>
            <div className='deck'>
                {cards.map((card, idx) => (
                    <Card key={idx} backgroundImage={card.image}/>
                ))}
            </div>
        </div>
    )
}

export default Deck;