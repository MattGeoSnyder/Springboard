import { useState, useEffect } from 'react';
import API from '../../../api';
import Prompt from './Prompt';
import './Prompts.css';
import { v4 as uuid } from 'uuid';

const Prompts = () => {
  const [prompts, setPrompts] = useState([]);

  // const userPrompts = useSelector(state => state.profileForm.formData.prompts);
  // const userId = useSelector(state => state.user.testuser.id);
  // const status = useSelector(state => state.profileForm.status);


  // useEffect(() => {
  //   if (status === 'pending') {
  //     dispatch(postPrompts({ prompts: userPrompts, userId}));
  //   } 
  // }, [status, userPrompts])

  //Load prompts on mount.
  //Deciding not to make this into a dispatch since the state is centralized
  useEffect(() => {
    const loadPrompts = async () => {
      const res = await API.getPrompts();
      setPrompts(res);
    }

    loadPrompts();
  }, []);

  return (
    <div className="prompts-container">
      <div></div>
      <Prompt key={uuid()} prompts={prompts} name="prompt1" order='first' idx={0} />
      <Prompt key={uuid()} prompts={prompts} name="prompt2" order='second' idx={1}/>
      <Prompt key={uuid()} prompts={prompts} name="prompt3" order='last' idx={2}/>
    </div>
  )
}

export default Prompts;