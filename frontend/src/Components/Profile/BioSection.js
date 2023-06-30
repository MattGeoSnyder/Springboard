import UserBanner from './UserBanner';
import Hates from './Hates';
import './BioSection.css';

const BioSection = ({ user={} }) => {

  //going to have to pass in form data for bio
  const bio = user.bio || "";

  return (
    <div className="bio-wrapper">
      <div className="bio-container"> 
        <UserBanner user={user}/>
        <Hates user={user}/>
        <div className='bio-content'>
          <p>Bio</p>
          <textarea
            id='bio'
            name='bio' 
            className='content'
            placeholder='Tell us all about yourself!'
          >

          </textarea>
        </div>
        <button>Update Profile</button>
      </div>
    </div>
  )
}

export default BioSection;