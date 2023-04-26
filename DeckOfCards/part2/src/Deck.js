import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './Card';
import Button from './Button';
import './Deck.css';

const Deck = () => {
    const BASE_URL = 'https://deckofcardsapi.com/api';
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadDeck() {
            let res = await axios.get(`${BASE_URL}/deck/new/shuffle`);
            setDeck(res.data.deck_id);
        }
        loadDeck();
    }, []);

    return (
        <div>
            <Button setCards={setCards} deck={deck} />
            <div className='deck'>
                {cards.map((card, idx) => (
                    <Card key={idx} backgroundImage={card.image}/>
                ))}
            </div>
        </div>
    )
}

export default Deck;