import moment from "moment";
import './UserBanner.css';

const UserBanner = ({ user }) => {
  const { first_name, birthday } = user;
  const age = moment().diff(birthday, 'years');
  const profile = user.profile;

  return (
    <div className='user-banner'>
    <div className={`user-icon ${profile ? "" : 'default'}`}>
        {!profile && <h1>{first_name[0]}</h1>}
      </div>
      <div className="user-name-age">
        <p id='name'>{user.first_name}</p>
        <p id='age'>{age}</p>
      </div>
    </div>
  )
}

export default UserBanner;