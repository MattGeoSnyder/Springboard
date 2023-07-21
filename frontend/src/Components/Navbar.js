import { useSelector, useDispatch } from 'react-redux';
import { setActive, setContent } from '../store/reducers/hatesSidebar';
import { useNavigate } from 'react-router-dom';
import NotificationBadge from './Profile/NotificationBadge';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.user.id);

  const active = useSelector(state => state.hatesSidebar.active);
  const notifications = useSelector( state => state.messages.notifications );
  
  const messageClick = (e) => {
    console.log('showing sidebar');
    dispatch(setContent('conversations'));
    navigate(`/users/${userId}`);
    dispatch(setActive(!active));
  }

  return (
    <nav id="navbar">
      <div id='message-icon' onClick={messageClick}>
        <i className="fa-solid fa-message"> 
          <NotificationBadge notifications={notifications} mode={'nav'}/>
        </i>
      </div>
    </nav>
  )
}


export default Navbar;