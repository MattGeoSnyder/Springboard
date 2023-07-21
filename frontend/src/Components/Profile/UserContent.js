import { memo } from 'react';
import Photos from "./Photos/Photos";
import BioSection from "./BioSection/BioSection";
import Prompts from './Prompts/Prompts';

const UserContent = memo(() => {

  return (
    <>
      <BioSection />
      <Photos />
      <Prompts />
    </>
  )
});

export default UserContent;