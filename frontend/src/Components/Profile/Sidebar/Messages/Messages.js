import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { fetchConversation, addNewMessage } from '../../../../store/reducers/matches';
import { v4 as uuid } from 'uuid';
import MessageForm from "./MessageForm";
import MessageLoader from "./MessageLoader";
import Message from './Message';
import './Messages.css';

const Messages = () => {
    const PROFILE_PIC_BASE_URL = `https:randomuser.me/portraits`;


    const dispatch = useDispatch();

    const { userId, matchId } = useParams();
    const matchedUser = useSelector(state => state.matches.matches[matchId]);
    const messages = useSelector(state => state.matches.matches[matchId]?.messages);
    const [ icon, setIcon ] = useState(matchedUser.photos?.photo1?.image_url);

    console.log(userId);

    const ws = useMemo(() => {
      return new WebSocket(`ws://localhost:3001/chat/${matchId}`);
    }, [matchId]);

    useEffect(() => {
      const getPhoto = () => {
          if ( matchedUser.id > 102) return;

          const sex = matchedUser.user_sex === 'male' ? 'men' : 'women';
          setIcon(`${PROFILE_PIC_BASE_URL}/${sex}/${matchedUser.id}.jpg`);
      }

      getPhoto();
  }, [matchedUser])


    useEffect(() => {
      dispatch(fetchConversation(matchId));
      ws.onmessage = function(evt) {
        let message = JSON.parse(evt.data);
        dispatch(addNewMessage({ matchId, message }));
      }
      ws.onopen = function(evt) {
        console.log('connecting to ws');
      }

    }, [matchId, dispatch]);

    return (
        <div id="messages">
            <div id='conversation-header'>
                <img src={icon}/>
                <p>{matchedUser.first_name}</p>
            </div>
            <div id='messages-container'>
                {messages.map(msg => (
                  <Message key={uuid()} message={msg} userId={userId}/>
                  ))}
                {/* <MessageLoader key={uuid()} offset={messages.length}/> */}
            </div>
            <MessageForm ws={ws}/>
        </div>
    )
}

export default Messages;