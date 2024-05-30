import { useSelector, useDispatch } from 'react-redux';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { setActive, setContent } from '../../store/reducers/hatesSidebar';
import { useNavigate } from 'react-router-dom';
import IconTray from './IconTray';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.user?.id);
  const { width } = useWindowDimensions();

  const active = useSelector(state => state.hatesSidebar.active);
  const notifications = useSelector( state => state.messages.notifications );

  const homeClick  = () => {
    navigate(`/users/${userId}`);
  }
  
  return (
    <nav id="navbar">
      { width > 800 && <div id='banner' onClick={homeClick}><p>Haters</p><i className="fa-solid fa-fire"></i></div> }
      {userId && <IconTray />}
    </nav>
  )
}


export default Navbar;