import UserBanner from './UserBanner';
import Hates from './Hates';
import './BioSection.css';

const BioSection = ({ user={} }) => {

  //going to have to pass in form data for bio
  const bio = user.bio || "";

  return (
    <div className="bio-container">
      <div className="bio"> 
        <UserBanner user={user}/>
        <Hates user={user}/>
        <div className='bio-content'>
          <p>Bio</p>
          <textarea 
            className='content'
          >

          </textarea>
        </div>
        <button>Update Profile</button>
      </div>
    </div>
  )
}

export default BioSection;