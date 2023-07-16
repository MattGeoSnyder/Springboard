import { memo } from 'react';
import Photos from "./Photos/Photos";
import BioSection from "./BioSection/BioSection";
import Prompts from './Prompts/Prompts';

const UserContent = memo(({ currentUser }) => {
  return (
    <>
      <BioSection user={currentUser}/>
      <Photos user={currentUser}/>
      <Prompts user={currentUser}/>
    </>
  )
});

export default UserContent;