import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadPhoto } from '../../store/reducers/user';
import { setOverlayActive, setOverlayImage } from '../../store/reducers/overlay';
import CloudinaryAPI from '../../cloudinaryAPI';
import './PhotoInput.css';

const PhotoInput = ({ name, username, photoLabel }) => {
  const dispatch = useDispatch();

  //Todo: update userId away from testuser after testing.
  const userId = useSelector(state => state.user.testuser.id);
  const status = useSelector(state => state.profileForm.status);
  const [ image, setImage ]  = useState();
  const [ hasImage, setHasImage ] = useState(false);
  const input = useRef(null);

  const options = {
    public_id: name,
    overwrite: true,
    folder: username
    //other possible options:
    //async
    //eager
  }

  useEffect(() => {
    console.log(status, hasImage);
    if (status === 'pending' && hasImage) {
      dispatch(uploadPhoto({ image: input.current.files[0], options, name, userId }))
    }
  }, [hasImage, status, input, userId])

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setHasImage(true);
  }

  const removePhoto = (e) => {
    e.stopPropagation();
    setImage("");
    setHasImage(false);
  }

  const selectPhoto = (e) => {
    e.stopPropagation();
    dispatch(setOverlayActive(true));
    dispatch(setOverlayImage(image));
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(uploadPhoto({ image: image.current.files[0], options }))
  // }

  return (
      <div className='photo-input'>
        {hasImage && <div className='delete-btn' onClick={removePhoto}><i className="fa-solid fa-x"></i></div>}
        <div className='icon-container'> 
          {!hasImage && <i className="fa-solid fa-plus fa-4x"></i>}
        </div>
        <label htmlFor={name}>{photoLabel}</label>
        <img src={image} onClick={selectPhoto}/>
        {<input 
          type="file"
          id={name}
          name={name}
          className={hasImage ? 'hasImage' : ''}
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={input}
          />}
      </div>
  )
}

export default PhotoInput;