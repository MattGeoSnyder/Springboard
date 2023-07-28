import { useState, useEffect, memo } from 'react';
import PhotoInput from "./Photos/PhotoInput";
import BioSection from "./BioSection/BioSection";
import Prompt from './Prompts/Prompt';
import API from '../../api';
import { v4 as uuid } from 'uuid';
import './UserContent.css'

const UserContent = memo(() => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const loadPrompts = async () => {
      const res = await API.getPrompts();
      setPrompts(res);
    }

    loadPrompts();
  }, []);

  return (
    <>
      <BioSection />
      {/* <Photos />
      <Prompts /> */}
      <div id='user-content'>
        <PhotoInput name='photo1' photoLabel="Profile Photo" />
        <Prompt key={uuid()} prompts={prompts} name="prompt1" order='first' idx={0} />
        <PhotoInput name='photo2' photoLabel="Photo 2" />
        <Prompt key={uuid()} prompts={prompts} name="prompt2" order='second' idx={1}/>
        <PhotoInput name='photo3' photoLabel="Photo 3" />
        <Prompt key={uuid()} prompts={prompts} name="prompt3" order='last' idx={2}/>
      </div>
    </>
  )
});

export default UserContent;