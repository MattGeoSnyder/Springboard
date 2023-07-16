import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeBio } from '../../../store/reducers/profileForm';
import ProfileButton from './ProfileButton';
import LikeDislike from './ButtonBar';
import UserBanner from './UserBanner';
import UserHates from './UserHates';
import './BioSection.css';

const BioSection = ({ user={} }) => {

  const dispatch = useDispatch();

  const bio = useSelector(state => state.profileForm.formData.bio);
  const editable = useSelector(state => state.currentUser.editable);

  const handleChange = (e) => {
    dispatch(changeBio(e.target.value));
  }

  const renderBioContent= () => {
    const textarea = <textarea
      id='bio'
      name='bio' 
      className='content'
      placeholder='Tell us all about yourself!'
      value={bio}
      onChange={handleChange}
    />

    const div = <div>{bio}</div>

    return editable ? textarea : div;
  }

  const renderButtons = ()  => {
    if (editable) {
      return <ProfileButton />
    } else {
      return <LikeDislike />
    }
  }

  return (
    <div className="bio-wrapper">
      <div className="bio-container"> 
        <UserBanner user={user}/>
        <UserHates user={user}/>
        <div className='bio-content'>
          <p>Bio</p>
          {renderBioContent()}
        </div>
        {/* <ProfileButton /> */}
        {renderButtons()}
      </div>
    </div>
  )
};

export default BioSection;