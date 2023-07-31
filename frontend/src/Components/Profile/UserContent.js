import { useState, useEffect, useRef, memo } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import PhotoInput from "./Photos/PhotoInput";
import BioSection from "./BioSection/BioSection";
import Prompt from './Prompts/Prompt';
import API from '../../api';
import { v4 as uuid } from 'uuid';
import './UserContent.css'

const UserContent = memo(() => {
  const [prompts, setPrompts] = useState([]);
  const container = useRef();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const loadPrompts = async () => {
      const res = await API.getPrompts();
      setPrompts(res);
    }

    loadPrompts();
    container.current.scrollLeft = 0;
  }, []);

  const render = () => {
    const content = <>
        <PhotoInput name='photo1' photoLabel="Profile Photo" />
        <Prompt key={uuid()} prompts={prompts} name="prompt1" order='first' idx={0} />
        <PhotoInput name='photo2' photoLabel="Photo 2" />
        <Prompt key={uuid()} prompts={prompts} name="prompt2" order='second' idx={1}/>
        <PhotoInput name='photo3' photoLabel="Photo 3" />
        <Prompt key={uuid()} prompts={prompts} name="prompt3" order='last' idx={2}/>
    </>

    if (width <= 1120) {
      return (<>
        {content}
      </>)
    } else {
      return (
        <div id='user-content' ref={container}>
          {content}
        </div>  
      )
    }
  }

  return (
    <>
      <BioSection />
      {/* <Photos />
      <Prompts /> */}
      {render()}
    </>
  )
});

export default UserContent;