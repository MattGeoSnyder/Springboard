import { useSelector } from "react-redux";
import Navbar from '../Navbar';
import Photos from "./Photos";
import BioSection from "./BioSection";
import Prompts from './Prompts';
import './Profile.css'

const Profile = () => {
  const user = useSelector(state => (state.user.testuser));

  return (
      <form  id="profile-form" encType="multipart/form-data">
    <div id="profile-page">
        <BioSection user={user}/>
        <Photos user={user}/>
        <Prompts user={user}/>
    </div>
      </form>
  )
}

export default Profile;