import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeBio, postBio } from '../../store/reducers/profileForm';
import UserBanner from './UserBanner';
import UserHates from './UserHates';
import './BioSection.css';

const BioSection = ({ user={} }) => {

  const dispatch = useDispatch();


  const bio = useSelector(state => state.profileForm.formData.bio);
  const status = useSelector(state => state.profileForm.status);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(postBio({ bio, userId: user.id }));
    }
  }, [bio, status])

  const handleChange = (e) => {
    dispatch(changeBio(e.target.value));
  }

  return (
    <div className="bio-wrapper">
      <div className="bio-container"> 
        <UserBanner user={user}/>
        <UserHates user={user}/>
        <div className='bio-content'>
          <p>Bio</p>
          <textarea
            id='bio'
            name='bio' 
            className='content'
            placeholder='Tell us all about yourself!'
            onChange={handleChange}
          />
        </div>
        <button>Update Profile</button>
      </div>
    </div>
  )
}

export default BioSection;