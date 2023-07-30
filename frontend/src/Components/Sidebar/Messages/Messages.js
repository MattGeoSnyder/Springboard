import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getConversation } from "../../../store/thunks";
import { addNewMessage } from "../../../store/thunks";
import { v4 as uuid } from 'uuid';
import MessageForm from "./MessageForm";
import MessageLoader from "./MessageLoader";
import Message from './Message';
import './Messages.css';
import UserIcon from "../../Profile/UserIcon";
import { setContent } from "../../../store/reducers/hatesSidebar";

const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';

const Messages = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId, matchId } = useParams();
    const matchedUser = useSelector(state => state.matches.matches[matchId]);
    const messages = useSelector(state => state.messages.messages[matchId].messages);
    const errMsg = useSelector(state => state.messages.errMsg);
    const [ ws, setWs ] = useState(null);

    useEffect(() => {
      dispatch(getConversation({ userId, matchId }));
    }, [matchId]);
    
    useEffect(() => {

      if (!matchId || !userId) return;

      const ws = new WebSocket(`${WS_BASE_URL}/users/${userId}/matches/${matchId}`);   

      ws.onmessage = function (evt) {
        console.log(evt.data);
        console.log(typeof evt.data);
        let message = JSON.parse(evt.data);
        console.log(typeof message);
        dispatch(addNewMessage({ userId, message }));

        if (message.to_user === 1) {
          message = {...message, seen_at: new Date() };
          ws.send(JSON.stringify({ type: 'chatBot', payload: message }));
        }
      }

      ws.onopen = function(evt) {
        console.log('connecting to ws with match id', matchId);
        const action = JSON.stringify({ type: 'join' });
        ws.send(action);
      }

      ws.onerror = function(evt) {
        console.log('Websocket error', evt);
      }

      ws.onclose = function(evt) {
        console.log(`disconnecting from ws with match id`, matchId);
      }

      setWs(ws);

      return () => { 
        ws.close();
        setWs(null);
      };
  }, [matchId, userId, dispatch]);

    const goBack = (e) => {
      navigate(`/users/${userId}`);
      dispatch(setContent('conversations'));
    }

    return (
      <div id="messages">
          <div id='conversation-header'>
              <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
              <UserIcon user={matchedUser} mode={'messages'}/>
              <p>{matchedUser?.first_name}</p>
              {errMsg && <p>{errMsg}</p>}
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