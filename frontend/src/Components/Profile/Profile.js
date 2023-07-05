import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitForm } from "../../store/reducers/profileForm";
import Photos from "./Photos";
import BioSection from "./BioSection";
import Prompts from './Prompts';
import Hates from "./Hates";
import Overlay from "./Overlay";
import './Profile.css'


const Profile = () => {
  const user = useSelector(state => (state.user.testuser));
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm());
    console.log('submitting...')
  }

  return (
    <form  id="profile-form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div id="profile-page" >
          <BioSection user={user}/>
          <Photos user={user}/>
          <Prompts user={user}/>
          <Hates />
          <Overlay />
      </div>
    </form>
  )
}

export default Profile;
