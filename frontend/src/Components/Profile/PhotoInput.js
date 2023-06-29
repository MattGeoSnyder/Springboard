import { useState, useRef } from 'react';
import CloudinaryAPI from '../../cloudinaryAPI';
import './PhotoInput.css';

const PhotoInput = ({ name, username, photoLabel }) => {
  const [ image, setImage ]  = useState();
  const [ hasImage, setHasImage ] = useState(false);
  const [ select, setSelect ] = useState(false);
  const input = useRef(null);

  const options = {
    public_id: name,
    overwrite: true,
    folder: username
    //other possible options:
    //async
    //eager
  }

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setHasImage(true);
  }

  const removePhoto = () => {
    setImage("");
    setHasImage(false);
  }

  const uploadPhoto = async () => {
    const res = await CloudinaryAPI.uploadImage(input.current.files[0], options);
    console.log(res);
  }

  const selectPhoto = (e) => {
    if (hasImage){
      console.log('image clicked');
      console.log(e.target);
      setSelect(val => !val);
    }
  }

  return (
      <div className={`photo-input ${select ? 'select' : ''}`}>
        {hasImage && <div className='delete-btn' onClick={removePhoto}><i className="fa-solid fa-x"></i></div>}
        <div className='icon-container'> 
          {!hasImage && <i className="fa-solid fa-plus fa-4x"></i>}
        </div>
        <label htmlFor={name}>{photoLabel}</label>
        <img src={image}/>
        {!hasImage && <input 
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={input}
          />}
      </div>
  )
}

export default PhotoInput;