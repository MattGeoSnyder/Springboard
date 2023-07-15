import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById, setStatus, setEditPermissions } from '../../store/reducers/currentUser';
import { setDefault } from '../../store/reducers/profileForm';
import { Outlet } from 'react-router-dom';
import Photos from "./Photos/Photos";
import BioSection from "./BioSection/BioSection";
import Prompts from './Prompts/Prompts';
import Hates from "./Hates/Hates";
import Overlay from "./Overlay/Overlay";
import './Profile.css'

const Profile = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user.id);
  const currentUser = useSelector(state => state.currentUser.user);
  const status = useSelector(state => state.currentUser.status);
  const active = useSelector(state => state.hatesSidebar.active);

  console.log(userId, currentUserId);
  
  useEffect(() => {
    if (userId === currentUserId) {
      dispatch(setEditPermissions(true));
    }
  }, [userId, currentUserId, dispatch]);

  useEffect(() => {
    const { bio, hates, prompts }  = currentUser;
    dispatch(setDefault({ bio, hates, prompts }));
  }, [currentUser, dispatch]);
  
  useEffect(() => {
    if (status === 'success' || status === 'rejected') {
      setTimeout(() => {
        dispatch(setStatus('idle'));
      }, 3000);
    }
  }, [status, dispatch]);

  useEffect(() => {
      dispatch(getUserById(currentUserId));
  }, [currentUserId, dispatch]);

  return (
      <>
      <div id="profile-page" >
        <BioSection user={currentUser}/>
        <Photos user={currentUser}/>
        <Prompts user={currentUser}/>
        <Overlay />
        <div id='sidebar' className={active ? 'active' : ''}>
          <Outlet />
        </div>
      </div>
      </>
  )
}

export default Profile;
