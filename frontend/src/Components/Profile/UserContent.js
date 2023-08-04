import { useState, useEffect, useRef, memo } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import PhotoInput from "./Photos/PhotoInput";
import BioSection from "./BioSection/BioSection";
import Prompt from './Prompts/Prompt';
import API from '../../api';
import { v4 as uuid } from 'uuid';

const UserContent = memo(() => {
  const [prompts, setPrompts] = useState([]);
  const { height, width } = useWindowDimensions();

  console.log('Prompts in UserContent', prompts);

  useEffect(() => {
    const loadPrompts = async () => {
      const res = await API.getPrompts();
      setPrompts(res);
    }

    loadPrompts();
  }, []);

  const render = () => {
    if (width < 1120) {
      return (
        <>
          <BioSection />
          <PhotoInput name='photo1' photoLabel="Profile Photo" />
          <Prompt key={uuid()} prompts={prompts} name="prompt1" order='first' idx={0} />
          <PhotoInput name='photo2' photoLabel="Photo 2" />
          <Prompt key={uuid()} prompts={prompts} name="prompt2" order='second' idx={1}/>
          <PhotoInput name='photo3' photoLabel="Photo 3" />
          <Prompt key={uuid()} prompts={prompts} name="prompt3" order='last' idx={2}/>
        </>
      ) 
    } else {
      return (
        <>
          <BioSection />
          {/* <Photos />
          <Prompts /> */}
            <div id='photos'>
              <PhotoInput name='photo1' photoLabel="Profile Photo" />
              <PhotoInput name='photo2' photoLabel="Photo 2" />
              <PhotoInput name='photo3' photoLabel="Photo 3" />
            </div>
              <Prompt key={uuid()} prompts={prompts} name="prompt1" order='first' idx={0} />
              <Prompt key={uuid()} prompts={prompts} name="prompt2" order='second' idx={1}/>
              <Prompt key={uuid()} prompts={prompts} name="prompt3" order='last' idx={2}/>
        </>
      )
    }
  }

  return (
    <>
      {render()}
    </>
  )
});

export default UserContent;