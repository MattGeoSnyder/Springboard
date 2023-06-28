import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchConversation, addNewMessage } from "../../../store/reducers/matches";
import { v4 as uuid } from 'uuid';
import MessageForm from "./MessageForm";
import MessageLoader from "./MessageLoader";
import Message from './Message';
import './Messages.css';

const Messages = () => {

    const dispatch = useDispatch();

    const { matchId } = useParams();
    const match = useSelector(state => state.matches[matchId]) || {};
    const messages = useSelector(state => state.matches[matchId]?.messages) || [];

    const ws = new WebSocket(`ws://localhost:3001/chat/${matchId}`);

    useEffect(() => {
      dispatch(fetchConversation(matchId));
      ws.onmessage = function(evt) {
        let message = JSON.parse(evt.data);
        dispatch(addNewMessage({ matchId, message }));
      }

    }, [])

    return (
        <>
            <div id='conversation-header'>
                {match.first_name}
            </div>
            <div id='message-container'>
                {messages.map(msg => (
                  <Message key={uuid()} message={msg}/>
                  ))}
                <MessageLoader key={uuid()} offset={messages.length}/>
            </div>
            <MessageForm ws={ws}/>
        </>
    )
}

export default Messages;