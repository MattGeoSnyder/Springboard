import { useSelector, useDispatch } from 'react-redux';
import { setActive } from '../../../store/reducers/hatesSidebar';
import { v4 as uuid } from 'uuid';
import ConversationLink from './ConversationLink.js';
import './Conversations.css';

const Conversations = () => {
    const dispatch = useDispatch();

    const matches = useSelector(state => state.matches.matches);

    return (
        <div id='conversations'>
            <div id='header'>
                <i className="fa-solid fa-arrow-left" onClick={() => dispatch(setActive(false))}></i>
                <p>Your Matches</p>
                <hr />
            </div>
            {Object.keys(matches).map((matchId) => (
                <ConversationLink key={uuid()} matchId={matchId} />
            ))}
        </div>

    )
}

export default Conversations;