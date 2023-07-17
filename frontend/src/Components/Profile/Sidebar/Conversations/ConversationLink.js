import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setContent } from '../../../../store/reducers/hatesSidebar';
import { useNavigate, useParams } from "react-router-dom";
import './ConversationLink.css';

const ConversationLink = ({ matchId }) => {
    const PROFILE_PIC_BASE_URL = `https:randomuser.me/portraits`;

    const dispatch = useDispatch();

    const { userId } = useParams();
    const matchedUser = useSelector(state => state.matches.matches[matchId]);
    const [ icon, setIcon ] = useState(matchedUser.photos.photo1?.image_url);
    const navigate = useNavigate();

    useEffect(() => {
        const getPhoto = () => {
            if ( matchedUser.id > 102) return;

            const sex = matchedUser.user_sex === 'male' ? 'men' : 'women';
            setIcon(`${PROFILE_PIC_BASE_URL}/${sex}/${matchedUser.id}.jpg`);
        }

        getPhoto();
    }, [matchedUser])

    const goToConversation = () => {
        dispatch(setContent('messages'));
        navigate(`/users/${userId}/matches/${matchId}`);
    }

    return (
        <div onClick={goToConversation} className="conversation-link">
            <img src={icon}/>
            <div className='conversation-info'>
                <p>{matchedUser.first_name}</p>
            </div>
            <i className="fa-solid fa-caret-right"></i>
        </div>
    )
}

export default ConversationLink;