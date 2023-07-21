import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, setEditPermissions, setLikes } from '../../store/reducers/currentUser';
import { getCurrentUserById } from '../../store/thunks';
import { addLike, addDislike } from '../../store/reducers/matches';
import { setDefault } from '../../store/reducers/profileForm';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import UserContent from './UserContent';
import Sidebar from './Sidebar/Sidebar';
import Overlay from "./Overlay/Overlay";
import './Profile.css'


const OffScreenContent = memo(function OffScreenContent() {
  return (
    <>
      <Sidebar />
      <Overlay />
    </>
  )
});

// Takes prop id to render user profile 
const Profile = ({ id }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user.id);
  const currentUser = useSelector(state => state.currentUser.user);
  const loadStatus = useSelector(state => state.currentUser.status);
  const updateStatus = useSelector(state => state.profileForm.status);

  // Get current user by id on render
  useEffect(() => {
    if (id){
      dispatch(getCurrentUserById(id));
    }
  }, [id, dispatch]);

  // If current user profile equals main user
  // set editPermission to true
  useEffect(() => {
    if (userId === id) {
      dispatch(setEditPermissions(true));
    }
  }, [userId, id, dispatch]);

  // Loads the formData with the values of the current User 
  useEffect(() => {
    const { bio, hates, prompts }  = currentUser;
    dispatch(setDefault({ bio, hates, prompts }));
  }, [currentUser, dispatch]);
  
  // Changes status back to idle after loading the user is either accepted or rejected
  useEffect(() => {
    if (updateStatus === 'success' || updateStatus === 'rejected') {
      setTimeout(() => {
        dispatch(setStatus('idle'));
      }, 3000);
    }
  }, [updateStatus, dispatch]);

//////////////////////////////////////////////////////////////////////////////////////////////
// Code for swiping on users
//////////////////////////////////////////////////////////////////////////////////////////////

  const { width, height } = useWindowDimensions();
  const [ initialMouseX, setInitialMouseX ] = useState(0);
  const [ currentMouseX, setCurrentMouseX ] = useState(0);
  const [ dragDistance, setDragDistance ] = useState(0);
  const [ tilt, setTilt ] = useState('0deg');

  const calculateDragDistance = () => {
    const val = Math.round((currentMouseX - initialMouseX) * 100 / width );
    setDragDistance(val);
  }

  useEffect(() => {
    setDragDistance(0);
  }, [setDragDistance])

  useEffect(() => {
    const calculateTilt = () => {
      setTilt(`${Math.round(dragDistance/5)}deg`);
    }
    calculateTilt();
  }, [dragDistance]);


  const handleDragStart = (e) => {
    setInitialMouseX(e.clientX);
    const image = document.createElement('img');
    e.dataTransfer.setDragImage(image, 0, 0);
  }

  const handleDrag = (e) => {
    setCurrentMouseX(e.clientX);
    calculateDragDistance();
  }

  const handleDragEnd = () => {
    if (dragDistance < -20) {
      //dispatch dislike
      dispatch(setLikes(false));
      dispatch(addDislike({ userId, currentUserId: id }));
      console.log('dislike');
    } else if (dragDistance > 20) {
      //dispatch like
      dispatch(setLikes(true));
      dispatch(addLike({ userId, currentUserId: id}));
      console.log('like');
    } 
    setDragDistance(0);
  }

  const likes = useSelector(state => state.currentUser.likes);

  const getClassName = () => {
    if (likes === null) {
      return ''
    } else if (likes) {
      return 'likes'
    } else {
      return 'dislikes';
    }
  }

  return (
      <>
      <div
        draggable={userId !== id}
        id="profile-page" 
        className={getClassName()}
        onDragStart={handleDragStart} 
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={id !== userId ? {transform: `rotate(${tilt}) translate(${dragDistance}%, ${-Math.abs(dragDistance)}%)`} : {}}
        >
        {/* {ProfileContent} */}
        <UserContent />

        <OffScreenContent />
      </div>
      </>
  )
}

export default Profile;
