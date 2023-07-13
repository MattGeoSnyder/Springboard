import { useRef } from 'react';

const PromptOption = ({ prompt, setPrompt, setActive }) => {

    const promptId = useRef();

    //Selects the option when we click on it
    const selectOption = (e) => {
      console.log('option click');
      e.stopPropagation();
      const id = promptId.current.value;
      const promptContent = e.target.innerText;
      setPrompt({ id, prompt: promptContent });
      setActive(false);
    }

  return (
    <>
      <input type='hidden' value={prompt.id} ref={promptId}/>
      <div className='option' onClick={selectOption}>{prompt.prompt}</div>
    </>
  )
}

export default PromptOption;