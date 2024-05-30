import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setErrMsg } from '../../../store/reducers/messages';
import './MessageForm.css';

const MessageForm = ({ ws }) => {

    const dispatch = useDispatch();

    //We need references to our div input an the form to make an input 
    //that expands and reacts in the way we want it to.
    const divInput = useRef(null);
    const form = useRef(null);

    //info we need to send message
    const { matchId, userId } = useParams();
    const fromUser = useSelector(state => state.user.user.id);
    const toUser = useSelector(state => state.matches.matches[matchId].id);

    //initial state of form data
    const initialData = {
        matchId,
        fromUser,
        toUser,
        content: ""
    }

    //formData state
    const [formData, setFormData] = useState(initialData);

    //event handler for text input
    const handleChange = (e) => {
        const { id, innerText } = e.target;
        setFormData(data => ({...data, [id]: innerText}));
    }

    //event handler for enter key press when typing
    const handleReturn = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            form.current.requestSubmit();
        }
    }

    //event handler for submitting form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.content.length <= 200) {
            const action = JSON.stringify({ type: 'chat', payload: formData });
            ws.send(action);
            divInput.current.innerText = "";
            setFormData(data => ({...data, content: ""}));
        } else {
            dispatch(setErrMsg("Your message must be less than 200 characters."))
        }
    }

    // const handleSubmit = useCallback((e) => {
    //   e.preventDefault();
    //   if (formData.content.length <= 200) {
    //       const message = JSON.stringify(formData);
    //       ws.send(message);
    //       divInput.current.innerText = "";
    //       setFormData(data => ({...data, content: ""}));
    //   } else {
    //       dispatch(setErrMsg("Your message must be less than 200 characters."))
    //   }

    // }, [formData, ws, divInput, setFormData, dispatch])
  

    return (
        <div id='message-form'>
            <form onSubmit={handleSubmit} ref={form}>
                {/* We use a div becuase the height will
                adjust to text content. */}
                <div
                    id='content'
                    name="content"
                    contentEditable
                    onInput={handleChange}
                    onKeyDown={handleReturn}
                    ref={divInput}
                ></div>
                <button><i className="fa-regular fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

export default MessageForm;