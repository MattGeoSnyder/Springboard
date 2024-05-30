import { useSelector } from 'react-redux'
import UserIcon from '../UserIcon'
import moment from "moment";
import './UserBanner.css';

const UserBanner = () => {

  const user = useSelector(state => state.currentUser.user);
  const { first_name, birthday } = user;
  const age = moment().diff(birthday, 'years');

  return (
    <div className='user-banner'>
      <UserIcon mode={'banner'} user={user}/>
      <div className="user-name-age">
        <p id='name'>{first_name}</p>
        <p id='age'>{age}</p>
      </div>
    </div>
  )
}

export default UserBanner;