import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActive } from '../../../store/reducers/hatesSidebar';
import { v4 as uuid } from 'uuid';
import ConversationLink from './ConversationLink.js';
import './Conversations.css';
import moment from 'moment';

const Conversations = () => {
    const dispatch = useDispatch();

    const matches = useSelector(state => state.matches.matches);

    const mostRecent = (a, b) => {
        if (!a.last_interaction) return -1;

        if (!b.last_interaction) return 1; 

        if (moment(a.last_interaction).isBefore(b.last_interaction)) return 1;

        console.log(a.last_interaction, b.last_interaction);
        console.log(moment(a.last_interaction).isBefore(b.last_interaction))

        return -1;
    } 

    const matchesArr = Object.entries(matches).map(([id, match]) => {
        return ({ ...match, id });
    });

    const orderedMatches = matchesArr.sort(mostRecent);

    return (
        <div id='conversations'>
            <div id='header'>
                <i className="fa-solid fa-arrow-left" onClick={() => dispatch(setActive(false))}></i>
                <p>Your Matches</p>
                <hr />
            </div>
            {orderedMatches.map((match) => (
                <ConversationLink key={uuid()} matchId={match.id} />
            ))}
        </div>

    )
}

export default Conversations;