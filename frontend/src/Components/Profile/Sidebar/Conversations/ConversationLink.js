import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './ConversationLink.css';

const ConversationLink = ({ firstName, matchId }) => {

    const userId = useSelector(state => state.user.id);
    const navigate = useNavigate();

    const goToConversation = () => {
        navigate(`/users/${userId}/matches/${matchId}`);
    }

    return (
        <div onClick={goToConversation} className="conversation-link">
            {firstName}
        </div>
    )
}

export default ConversationLink;