import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'

const Deck = () => {
    const BASE_URL = 'https://deckofcardsapi.com/api';
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(52);

    useEffect(() => {
        async function loadDeck() {
            let res = await axios.get(`${BASE_URL}/deck/new/shuffle`);
            setDeck(res.data.deck_id);
        }
        loadDeck();
    }, []);

    function handleClick(e) {
        if (!remaining) {
            alert("Error: No cards remaining");
            return;
        }

        const drawCard = async () => {
            let res = await axios.get(`${BASE_URL}/deck/${deck}/draw`);
            let card = res.data.cards[0];
            setCards((cards) => [...cards, card]);
            setRemaining(count => count - 1);
        }
        drawCard();
    }

    return (
        <div>
            <button onClick={handleClick}>Hit Me!</button>
            <div className='deck'>
                {cards.map((card, idx) => (
                    <Card key={idx} backgroundImage={card.image}/>
                ))}
            </div>
        </div>
    )
}

export default Deck;