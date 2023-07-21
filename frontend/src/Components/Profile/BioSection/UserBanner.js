import { useSelector } from 'react-redux'
import UserIcon from '../UserIcon'
import moment from "moment";
import './UserBanner.css';

const UserBanner = () => {

  const user = useSelector(state => state.currentUser.user);
  const { first_name, birthday } = user;
  const age = moment().diff(birthday, 'years');
  const photo = user.photos.photo1?.image_url;

  const renderPhoto = () => {
    if (photo) {
      return (<img src={photo}/>)
    } else {
      return (<span><i className="fa-regular fa-user"></i></span>);
    }
  }
  

  return (
    <div className='user-banner'>
      <UserIcon size={'banner'} user={user}/>
      <div className="user-name-age">
        <p id='name'>{first_name}</p>
        <p id='age'>{age}</p>
      </div>
    </div>
  )
}

export default UserBanner;