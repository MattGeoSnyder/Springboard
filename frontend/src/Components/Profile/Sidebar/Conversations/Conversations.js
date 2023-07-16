import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import ConversationLink from './ConversationLink.js';
import './Conversations.css';

const Conversations = () => {

    const matches = useSelector(state => state.matches.matches);

    return (
        <>
            <h2 id='conversation-header'>
                Matches
            </h2>
            {Object.entries(matches).map(([matchId, match]) => (
                <ConversationLink key={uuid()} firstName={match.first_name} matchId={matchId} />
            ))}
        </>

    )
}

export default Conversations;