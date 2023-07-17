import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import ConversationLink from './ConversationLink.js';
import './Conversations.css';

const Conversations = () => {

    const matches = useSelector(state => state.matches.matches);

    return (
        <div id='conversations'>
            <h2 id='conversation-header'>
                Matches
            </h2>
            <hr />
            {Object.keys(matches).map((matchId) => (
                <ConversationLink key={uuid()} matchId={matchId} />
            ))}
        </div>

    )
}

export default Conversations;