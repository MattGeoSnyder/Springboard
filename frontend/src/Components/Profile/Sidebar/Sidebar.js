import Hates from './Hates';
import Conversations from './Conversations/Conversations';
import { useSelector } from 'react-redux';

const Sidebar = () => {

  const active = useSelector(state => state.hatesSidebar.active);
  const content = useSelector(state => state.hatesSidebar.content);

  const render = (content) => {
    switch (content) {
      case 'hates':
        return <Hates />    
      case 'conversations':
        return <Conversations />
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