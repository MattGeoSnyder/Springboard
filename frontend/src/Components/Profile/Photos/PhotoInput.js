import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadPhoto, deletePhoto } from '../../../store/thunks';
import { setPhoto } from '../../../store/reducers/currentUser';
import { setOverlayActive, setOverlayImage, setOverlayMode } from '../../../store/reducers/overlay';
import API from '../../../api';
import './PhotoInput.css';

const PhotoInput = ({ name, photoLabel }) => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.currentUser.user.id);
  const username = useSelector(state => state.currentUser.user.username);
  const editable = useSelector(state => state.currentUser.editable);
  const status = useSelector(state => state.profileForm.status);
  const photo = useSelector(state => state.currentUser.user.photos[name]?.image_url);
  const [ hasPhoto, setHasPhoto ] = useState(false);
  const input = useRef(null);


  //I decided to keep another piece of state for clarity
  useEffect(() => {
    if (photo) {
      setHasPhoto(true);
    } else {
      setHasPhoto(false);
    }
  },[photo, setHasPhoto]);


  // upload photo when update profile button is clicked
  // triggers status pending
  useEffect(() => {
    const options = {
      public_id: name,
      overwrite: true,
      folder: username
      //other possible options:
      //async
      //eager
    }  

    if (status === 'pending' && input.current.value) {
      dispatch(uploadPhoto({ image: input.current.files[0], options, name, userId })); 
    }
  }, [hasPhoto, status, input, userId, name, username, dispatch]);

  //Put photo thumbnail on change
  const handleChange = (e) => {
    dispatch(setPhoto({ name, user_id: userId, 
                      public_id: `${username}/${name}`, 
                      image_url: URL.createObjectURL(e.target.files[0])}));
    setHasPhoto(true);
  }

  //remove photo on change. TODO: Don't trigger delete on new change
  const removePhoto = (e) => {
    e.stopPropagation();

    if (!editable) return;

    setPhoto("");
    setHasPhoto(false);
    dispatch(deletePhoto({ public_id: `${username}/${name}`, name }));
  }

  //set photo to overlay on click
  const selectPhoto = (e) => {
    e.stopPropagation();
    dispatch(setOverlayActive(true));
    dispatch(setOverlayMode('image'));
    dispatch(setOverlayImage(photo));
  }

  const render = () => {
    const photoInput = <div className='photo-input'>
      {hasPhoto && editable && <div className='delete-btn' onClick={removePhoto}><i className="fa-solid fa-x"></i></div>}
      <div className='icon-container'> 
        {!hasPhoto && <i className="fa-solid fa-plus fa-4x"></i>}
      </div>
      {editable && <label htmlFor={name}>{photoLabel}</label>}
      {hasPhoto && <img 
        src={photo} 
        onClick={selectPhoto}
        alt=''/>}
      <input 
        type="file"
        id={name}
        name={name}
        title=' '
        className={hasPhoto ? 'hasImage' : ''}
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={input}
        />
    </div>

    if (hasPhoto || editable) {
      return photoInput;
    }

  }

  return ( <>{render()}</>)  
}

export default PhotoInput;