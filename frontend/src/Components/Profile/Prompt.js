import { useSelector, useDispatch } from 'react-redux';
import { changePrompt, postPrompt } from '../../store/reducers/profileForm';
import { useState, useEffect, useMemo } from 'react';
import PromptOption from './PromptOption';
import { v4 as uuid } from 'uuid';
import './Prompt.css';

//There are a lot of onclick event listeners in this component. 
//There is a crucial snippet of CSS to make this work.
//See Prompt.css:16

const Prompt = ({ prompts, name: name, order="", idx, value }) => {
  const defaultPrompt = { id: 0, prompt: `Choose your ${order} prompt`};
  const dispatch = useDispatch();

  const [ optionsActive, setOptionsActive ] = useState(false);
  const [ prompt, setPrompt ] = useState(defaultPrompt);
  const [ promptChosen, setPromptChosen ] = useState(prompt.id !== 0);
  const [ textareaActive, setTextareaActive ] = useState(false);

  const userId = useSelector(state => state.user.testuser.id);
  const status = useSelector(state => state.profileForm.status);
  const promptRes = useSelector(state => (
    state.profileForm.formData[name].promptRes));

  useEffect(() => {
    setPromptChosen(prompt.id !== 0);
  }, [prompt]);

  useEffect(() => {
    setTextareaActive(promptChosen || promptRes);
  }, [promptChosen, promptRes]);

  useEffect(() => {
    if (status === 'pending' && promptRes) {
      dispatch(postPrompt({ name, id: prompt.id, promptRes, userId }));
    }
  }, [status, prompt, promptRes, userId])

  //Event listener for the document. 
  //This will unselect options when we click off of the prompt.
  //It will also collapse textarea if it is empty and we click
  //off of the prompt.
  useEffect(() => {  
    const optionsOff = (e) => {
      console.log(e.target);
      if (e.target.id !== name){
        setOptionsActive(false);
      }
      if (!promptRes) {
        console.log(promptRes);
        setPrompt(defaultPrompt);
      }  
    }

    document.addEventListener('click', optionsOff);

    return () => {document.removeEventListener('click', optionsOff)};
  }, [promptRes]);

  //Selects the prompt when we click on it
  const selectPrompt = (e) => {
    e.stopPropagation();
    if (e.target.id === name) setOptionsActive(!optionsActive);
  }

  const handleChange = (e) => {
    const promptRes = e.target.value;
    dispatch(changePrompt({ name, id: prompt.id, promptRes }));
  }

  return (
    <div id={name} className='prompt' onClick={selectPrompt}>
      <i className="fa-solid fa-plus"></i>
      <div><p>{prompt.prompt}</p></div>
      <textarea
        className={`prompt-input ${textareaActive ? 'active' : ''}`}
        id={`${name}-input`}
        name={`${name}-input`}
        onChange={handleChange}
        value={promptRes}
      />
        {<div className={`options ${optionsActive ? 'active' : ""}`}>
        {prompts.map((prompt) => (
          <PromptOption key={uuid()} prompt={prompt} setPrompt={setPrompt} setActive={setOptionsActive}/>
        ))}
      </div>}
    </div>
  )
}

export default Prompt;