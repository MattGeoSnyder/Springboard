import { useSelector, useDispatch } from 'react-redux';
import { changePrompt } from '../../../store/reducers/profileForm';
import { useState, useEffect, useMemo } from 'react';
import API from '../../../api';
import PromptOption from './PromptOption';
import { v4 as uuid } from 'uuid';
import './Prompt.css';

//There are a lot of onclick event listeners in this component. 
//There is a crucial snippet of CSS to make this work.
//See Prompt.css:16

const Prompt = ({ prompts, name, order="" }) => {
  const defaultPrompt = useMemo(() => ({id: 0, prompt: `Choose your ${order} prompt`}), [order]);

  const dispatch = useDispatch();
  
  const [ optionsActive, setOptionsActive ] = useState(false);
  const [ prompt, setPrompt ] = useState(defaultPrompt);
  const [ promptChosen, setPromptChosen ] = useState(prompt.id !== 0);
  // const [ textareaActive, setTextareaActive ] = useState(false);

  const promptId = useSelector(state => state.profileForm.formData.prompts[name]?.id);
  const promptRes = useSelector(state => (
    state.profileForm.formData.prompts[name]?.promptRes));

  const editable = useSelector(state => state.currentUser.editable);

  useEffect(() => {
    if(promptId) {
      const getPromptById = async () => {
        const prompt = await API.getPromptById(promptId);
        setPrompt(prompt);
      }
      
      getPromptById();
    } 
  }, [promptId, setPrompt]);
  

  useEffect(() => {
    setPromptChosen(prompt.id !== 0);
  }, [prompt, setPromptChosen]);

  // useEffect(() => {
  //   setTextareaActive(promptChosen || promptRes);
  // }, [promptChosen, promptRes, setTextareaActive]);

  const textareaActive = useMemo(() => promptChosen || promptRes, [promptChosen, promptRes]);


  //Event listener for the document. 
  //This will unselect options when we click off of the prompt.
  //It will also collapse textarea if it is empty and we click
  //off of the prompt.
  useEffect(() => {  
    const optionsOff = (e) => {
      e.stopPropagation();
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
  }, [promptRes, defaultPrompt, name]);

  //Selects the prompt when we click on it
  const selectPrompt = (e) => {
    e.stopPropagation();
    if (e.target.id === name) setOptionsActive(!optionsActive);
  }

  const handleChange = (e) => {
    const promptRes = e.target.value;
    dispatch(changePrompt({ name, id: prompt.id, promptRes }));
  }

  const renderText = () => {
    const textarea = <textarea
      className={`prompt-input ${textareaActive ? 'active' : ''}`}
      id={`${name}-input`}
      name={`${name}-input`}
      onChange={handleChange}
      value={promptRes}
    />

    const div = <div>{promptRes}</div>

    return editable ? textarea : div;
  }

  return (
    <div id={name} className='prompt' onClick={selectPrompt}>
      {editable && <i className="fa-solid fa-plus"></i>}
      <div><p>{prompt.prompt}</p></div>
      {renderText()}
        {editable && <div className={`options ${optionsActive ? 'active' : ""}`}>
        {prompts.map((prompt) => (
          <PromptOption key={uuid()} prompt={prompt} setPrompt={setPrompt} setActive={setOptionsActive}/>
        ))}
      </div>}
    </div>
  )
}

export default Prompt;