import { useState, useEffect } from 'react';
import API from '../../api';
import Prompt from './Prompt';
import './Prompts.css';

const Prompts = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const loadPrompts = async () => {
      const res = await API.getPrompts();
      setPrompts(res);
    }

    loadPrompts();
  }, []);

  console.log(prompts);

  return (
    <div className="prompts-container">
      <Prompt prompts={prompts} promptname="prompt1" order='first'/>
    </div>
  )
}

export default Prompts;