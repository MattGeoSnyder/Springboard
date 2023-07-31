import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { changeBio } from '../../../store/reducers/profileForm';
import ProfileButton from './ProfileButton';
import LikeDislike from './ButtonBar';
import UserBanner from './UserBanner';
import UserHates from './UserHates';
import './BioSection.css';

const BioSection = ({ user }) => {

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

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

  //Render button depending if on User Profile or other user profile
  const renderButtons = ()  => {
    if (editable) {
      return <ProfileButton />
    } else {
      return <LikeDislike />
    }
  }

  const render = () => {

    const content = <>
      <UserBanner user={user}/>
      <UserHates user={user}/>
      <div className='bio-content'>
        <p>Bio</p>
        {renderBioContent()}
      </div>
      {renderButtons()}
    </>


    if (width <= 1120) {
      return (<>
        {content}
      </>)
    } else {
      return(<div className='bio-container'>
        {content}
      </div>)
    }
  }

  return (
    // <div className="bio-container"> 
    //   <UserBanner user={user}/>
    //   <UserHates user={user}/>
    //   <div className='bio-content'>
    //     <p>Bio</p>
    //     {renderBioContent()}
    //   </div>
    //   {renderButtons()}
    // </div>
    <>
      {render()}
    </>
  )
};

export default BioSection;