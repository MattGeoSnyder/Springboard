import Hates from './Hates';
import Conversations from './Conversations/Conversations';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = () => {

  const active = useSelector(state => state.hatesSidebar.active);
  const content = useSelector(state => state.hatesSidebar.content);

  const render = (content) => {
    switch (content) {
      case 'hates':
        return <Hates />    
      case 'conversations':
        return <Conversations />
      case 'messages':
        return <Outlet />
      default:
        return <></>
    }
  }

  return (
    <div id="sidebar" className={active ? 'active' : ''}>
      {render(content)}
    </div>
  )
}

export default Sidebar;