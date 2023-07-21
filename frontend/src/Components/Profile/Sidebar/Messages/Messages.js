import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getConversation } from "../../../../store/thunks";
import { addNewMessage } from "../../../../store/reducers/messages";
// import { fetchConversation, addNewMessage } from '../../../../store/reducers/matches';
import API from "../../../../api";
import { v4 as uuid } from 'uuid';
import MessageForm from "./MessageForm";
import MessageLoader from "./MessageLoader";
import Message from './Message';
import './Messages.css';
import UserIcon from "../../UserIcon";
import { setContent } from "../../../../store/reducers/hatesSidebar";

const Messages = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId, matchId } = useParams();
    const matchedUser = useSelector(state => state.matches.matches[matchId]);
    const messages = useSelector(state => state.messages.messages[matchId].messages);
    const errMsg = useSelector(state => state.messages.errMsg);

    const ws = useMemo(() => {
      return new WebSocket(`ws://localhost:3001/chat/${matchId}`);    
    }, [matchId]);

    useEffect(() => {
      dispatch(getConversation({ userId, matchId }));
    }, [matchId]);
    

    useEffect(() => {
      const chatBot = async (message) => {
        try {
          const res = await API.getChatBotRes(message);
          console.log(res);
          const chatBotRes = JSON.stringify(res);
          ws.send(chatBotRes);
        } catch (error) {
          const chatBotRes = JSON.stringify({ matchId, fromUser: 1, toUser: userId, content: "I don't have a good response right now. Try again later. "})
          ws.send(chatBotRes)
        }
      }


      ws.onmessage = function (evt) {
        let message = JSON.parse(evt.data);
        dispatch(addNewMessage({ matchId, message }));

        console.log(message);
       
        if (message.to_user == 1) {
          chatBot({ matchId: message.match_id, 
                          toUser: message.to_user, 
                          fromUser: message.from_user, 
                          content: message.content });
        } 

      }


      ws.onopen = function(evt) {
        console.log('connecting to ws with matchId', matchId);
      }

      return () => { ws.onmessage = () => {} };
    }, [ws, matchId, dispatch]);

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