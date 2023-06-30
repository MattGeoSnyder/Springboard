import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './Prompt.css';

//There are a lot of onclick event listeners in this component. 
//There is a crucial snippet of CSS to make this work.
//See Prompt.css:16

const Prompt = ({ prompts, promptname, order="" }) => {
  const defaultPrompt = `Choose your ${order} prompt`;

  const [ select, setSelect ] = useState(false);
  const [ prompt, setPrompt ] = useState(defaultPrompt);
  const [ promptChosen, setPromptChosen ] = useState(prompt !== defaultPrompt);


  useEffect(() => {
    setPromptChosen(prompt !== defaultPrompt);
  }, [prompt]);

  //Event listener for the document. 
  //This will unselect our prompt when we 
  //click elsewhere on the page
  useEffect(() => {
    document.addEventListener('click', (e) => {
      console.log('doc click');
      console.log(e.target);
      if (e.target.id !== promptname){
        setSelect(false);
        setPrompt(defaultPrompt);
      }
    })
  }, [])

  //Selects the prompt when we click on it
  const selectPrompt = (e) => {
    console.log('prompt click');
    e.stopPropagation();
    if (e.target.id === promptname) setSelect(!select);
  }

  //Selects the option when we click on it
  const selectOption = (e) => {
    console.log('option click');
    e.stopPropagation();
    const val = e.target.innerText;
    setPrompt(val);
    setSelect(false);
  }

  return (
    <div id={promptname} className='prompt' onClick={selectPrompt}>
      <i className="fa-solid fa-plus"></i>
      <div><p>{prompt}</p></div>
      {promptChosen && <textarea
        className='prompt-input'
        id={`${promptname}-input`}
        name={`${promptname}-input`}
      />}
        {select && <div className='options'>
        {prompts.map((p) => (
          <div key={uuid()} className='option' onClick={selectOption}>{p.prompt}</div>
        ))}
      </div>}
    </div>
  )
}

export default Prompt;