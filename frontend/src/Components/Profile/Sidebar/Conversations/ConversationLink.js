import { useSelector, useDispatch } from "react-redux";
import { setContent } from '../../../../store/reducers/hatesSidebar';
import { useNavigate, useParams } from "react-router-dom";
import UserIcon from "../../UserIcon";
import './ConversationLink.css';

const ConversationLink = ({ matchId }) => {
    const dispatch = useDispatch();

    const { userId } = useParams();
    const matchedUser = useSelector(state => state.matches.matches[matchId]);
    
    const navigate = useNavigate();

    const goToConversation = () => {
        dispatch(setContent('messages'));
        navigate(`/users/${userId}/matches/${matchId}`);
    }

    return (
        <div onClick={goToConversation} className="conversation-link">
            <UserIcon mode={'link'} user={matchedUser} />
            <div className='conversation-info'>
                <p>{matchedUser.first_name}</p>
            </div>
            <i className="fa-solid fa-caret-right"></i>
        </div>
    )
}

export default ConversationLink;