import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './Prompt.css';

const Prompt = ({ prompts, promptname }) => {
  const [ select, setSelect ] = useState(false);

  const selectPrompt = (e) => {
    console.log(e.target);
    const { name } = e.target;
    if(name === promptname) {
      setSelect(!select);
    }
    
  }

  return (
    <div className='prompt' name={promptname} onClick={selectPrompt}>
      <i className="fa-solid fa-plus"></i>
      <input
        id={promptname}
        name={promptname} 
        type='hidden'
      />
      <div><p>Add a profile prompt</p></div>
        {select && <div className='options'>
        {prompts.map((p) => (
          <div key={uuid()} className='option'>{p.prompt}</div>
        ))}
      </div>}
    </div>
  )
}

export default Prompt;