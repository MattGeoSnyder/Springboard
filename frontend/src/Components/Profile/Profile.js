import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, setEditPermissions, setLikes } from '../../store/reducers/currentUser';
import { getCurrentUserById, loadUserAssets } from '../../store/thunks';
import { addLike, addDislike } from '../../store/reducers/matches';
import { setDefault } from '../../store/reducers/profileForm';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import UserContent from './UserContent';
import Sidebar from '../Sidebar/Sidebar';
import Overlay from "./Overlay/Overlay";
import './Profile.css'
import { useLocalStorage } from '../../hooks/useLocalStorage';


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
  const [ get, set, remove ] = useLocalStorage();

  const user = useSelector(state => state.user.user);
  const currentUser = useSelector(state => state.currentUser.user);
  const loadStatus = useSelector(state => state.currentUser.status);
  const updateStatus = useSelector(state => state.profileForm.status);
  const userId = user.id;

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
      console.log('setting edit true');
      dispatch(setEditPermissions(true));
    } else {
      dispatch(setEditPermissions(false));
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

  const resetDragState = () => {
    setInitialMouseX(0);
    setCurrentMouseX(0);
    setDragDistance(0);
    setTilt('0deg');
  }

  const calculateDragDistance = () => {
    const val = Math.round((currentMouseX - initialMouseX) * 100 / width );
    setDragDistance(val);
  }

  // useEffect(() => {
  //   setDragDistance(0);
  // }, [id, setDragDistance])

  useEffect(() => {
    const calculateTilt = () => {
      setTilt(`${Math.round(dragDistance/5)}deg`);
    }
    calculateTilt();
  }, [dragDistance]);


  const handleDragStart = (e) => {
    setInitialMouseX(e.screenX);
    setCurrentMouseX(e.screenX);
    const image = document.createElement('img');
    e.dataTransfer.setDragImage(image, 0, 0);
  }

  const handleDrag = (e) => {
    setCurrentMouseX(e.screenX);
    calculateDragDistance();
  }

  const handleDragEnd = () => {
    if (dragDistance < -20) {
      //dispatch dislike
      dispatch(setLikes(false));
      dispatch(addDislike({ userId, currentUserId: id }));

      setTimeout(() => {
        setDragDistance(0);
      }, 1000);

    } else if (dragDistance > 20) {
      //dispatch like
      dispatch(setLikes(true));
      dispatch(addLike({ userId, currentUserId: id}));

      setTimeout(() => {
        resetDragState();
      }, 1000);

    }
    resetDragState();
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// Copy swipe code above for mobile
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleTouchStart = (e) => {
    setInitialMouseX(e.touches[0].screenX);
    setCurrentMouseX(e.touches[0].screenX);
  }
  
  const handleTouchMove = (e) => {
    setCurrentMouseX(e.touches[0].screenX);
    calculateDragDistance();
  }

  const handleTouchEnd = () => {
    if (dragDistance < -20) {
      //dispatch dislike
      dispatch(setLikes(false));
      dispatch(addDislike({ userId, currentUserId: id }));

      setTimeout(() => {
        setDragDistance(0);
      }, 1000);

    } else if (dragDistance > 20) {
      //dispatch like
      dispatch(setLikes(true));
      dispatch(addLike({ userId, currentUserId: id}));

      setTimeout(() => {
        resetDragState();
      }, 1000);

    }
    resetDragState();
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={id !== userId ? {transform: `rotate(${tilt}) translate(${dragDistance}%, ${-Math.abs(dragDistance)}%)`} : {}}
      >
        {/* {ProfileContent} */}
        <UserContent />

      </div>
      <OffScreenContent />
      </>
  )
}

export default Profile;
