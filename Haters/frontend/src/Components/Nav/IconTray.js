import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActive, setContent } from '../../store/reducers/hatesSidebar';
import { logoutUser } from '../../store/reducers/user';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationBadge from '../Profile/NotificationBadge';
import UserIcon from '../Profile/UserIcon';
import './IconTray.css'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const IconTray = () => {

  const [ activePage, setActivePage ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [ get, set, remove ] = useLocalStorage();
  const { width } = useWindowDimensions();

  const user = useSelector(state => state.user.user);
  const userId = user.id;

  const active = useSelector(state => state.hatesSidebar.active);
  const notifications = useSelector( state => state.messages.notifications );

  useEffect(() => {
    if (location.pathname.includes('profile')) {
      setActivePage('profile');
    } else {
      setActivePage('home');
    }
  }, [location])
  
  const messageClick = (e) => {
    dispatch(setContent('conversations'));
    dispatch(setActive(!active));
  }

  const profileClick = (e) => {
    navigate(`/users/${userId}/profile`);
    setActivePage('profile');
  }

  const logout = () => {
    remove();
    dispatch(logoutUser());
    navigate(`/`, { replace: true });
  }

  return (
    <div id="icon-tray" >
      <div className={`icon message ${activePage === 'message' ? 'active' : ''}`} onClick={messageClick}>
        <NotificationBadge notifications={notifications} mode={'nav'}/>
        <i className="fa-solid fa-message"></i>
      </div>
      <div className={`icon home ${ activePage === 'home'? 'active' : '' }`} onClick={() => {navigate(`/users/${userId}`)}}>
        <i className="fa-solid fa-house"></i>
      </div>
      <div className={`icon profile ${ activePage === 'profile' ? 'active' : ''}`} onClick={profileClick}>
        {width > 650 &&<p>{user.first_name}</p>}
        <UserIcon mode={'nav'} user={user}/>
      </div>
      { <div className='icon logout' onClick={logout}>
        {width > 700 && <p>Logout</p>}
        <i className="fa-solid fa-right-to-bracket logout icon"></i>
      </div> }
    </div>
  )
}

export default IconTray;