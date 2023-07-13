import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../../api';
import { uploadPhoto } from '../../../store/reducers/user';
import { setOverlayActive, setOverlayImage } from '../../../store/reducers/overlay';
import './PhotoInput.css';

const PhotoInput = ({ name, photoLabel }) => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.currentUser.user.id);
  const userSex = useSelector(state => state.currentUser.user.user_sex);
  const username = useSelector(state => state.currentUser.user.username);
  const editable = useSelector(state => state.currentUser.editable);
  const status = useSelector(state => state.user.status);
  const [ image, setImage ]  = useState();
  const [ hasImage, setHasImage ] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    const getPhoto = async () => {
      const photo = await API.getUserPhotoById(username, name);
      if (photo.image_url) {
        setImage(photo.image_url);
        setHasImage(true);
      }
    }
    
    if (userId < 101 && name === 'photo1') {
      const sex = userSex === "male" ? 'men' : 'women';
      const url = `https:randomuser.me/portraits/${sex}/${userId}.jpg`
      setImage(url);
      setHasImage(true);
    } else {
      getPhoto();
    }

  }, [username, userSex, userId, name])

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
      dispatch(uploadPhoto({ image: input.current.files[0], options, name, userId }))
    }
  }, [hasImage, status, input, userId, name, username, dispatch])

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setHasImage(true);
  }

  const removePhoto = (e) => {
    e.stopPropagation();

    if (!editable) return;

    setImage("");
    setHasImage(false);
  }

  const selectPhoto = (e) => {
    e.stopPropagation();
    dispatch(setOverlayActive(true));
    dispatch(setOverlayImage(image));
  }

  const render = () => {
    const photoInput = <div className='photo-input'>
      {hasImage && editable && <div className='delete-btn' onClick={removePhoto}><i className="fa-solid fa-x"></i></div>}
      <div className='icon-container'> 
        {!hasImage && <i className="fa-solid fa-plus fa-4x"></i>}
      </div>
      <label htmlFor={name}>{photoLabel}</label>
      {hasImage && <img src={image} onClick={selectPhoto} alt=''/>}
      <input 
        type="file"
        id={name}
        name={name}
        title=' '
        className={hasImage ? 'hasImage' : ''}
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={input}
        />
    </div>

    if (hasImage || editable) {
      return photoInput;
    }

  }

  return ( <>{render()}</>)  
}

export default PhotoInput;