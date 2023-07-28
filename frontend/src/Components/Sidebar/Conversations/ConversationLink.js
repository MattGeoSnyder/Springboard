import { useSelector, useDispatch } from "react-redux";
import { setContent } from '../../../store/reducers/hatesSidebar';
import { useNavigate, useParams } from "react-router-dom";
import UserIcon from "../../Profile/UserIcon";
import NotificationBadge from '../../Profile/NotificationBadge';
import './ConversationLink.css';

const ConversationLink = ({ matchId }) => {
    const dispatch = useDispatch();

    const { userId } = useParams();
    const matchedUser = useSelector(state => state.matches.matches[matchId]);
    const notifications = useSelector(state => state.messages.messages[matchId]?.notifications);
    const lastMessage = useSelector(state => state.messages.messages[matchId].messages[0]);

    
    const navigate = useNavigate();

    const goToConversation = () => {
        dispatch(setContent('messages'));
        navigate(`/users/${userId}/matches/${matchId}`);
    }

    const transformMessage = () => {
        let msg = '';

        if (!lastMessage) return msg;

        if (lastMessage.from_user == userId) {
            msg += 'You: ';
        }

        msg += lastMessage.content.slice(0,10);

        if (lastMessage.content.length > 10) msg += '...';

        return msg;
    }

    return (
        <div onClick={goToConversation} className="conversation-link">
            <UserIcon mode={'link'} user={matchedUser} />
            <div className='conversation-info'>
                <p>{matchedUser.first_name}</p>
                <div className="detail">
                    <p>{transformMessage()}</p>
                    <NotificationBadge notifications={notifications} mode="message" />
                    <i className="fa-solid fa-caret-right"></i>
                </div>
            </div>
        </div>
    )
}

export default ConversationLink;