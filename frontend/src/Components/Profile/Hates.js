import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setActive } from '../../store/reducers/hatesSidebar';
import Hate from './Hate';
import API from '../../api';
import { v4 as uuid } from 'uuid';
import './Hates.css';


const Hates = () => {

  const [ hates, setHates ] = useState({});
  const active = useSelector(state => state.hatesSidebar.active)
  const dispatch = useDispatch();

  useEffect(() => {
    const queryHates = async () => {
      const res = await API.getHates();
      setHates(res);
    }

    queryHates();
  }, []);

  const hide = (e) => {
    e.stopPropagation();
    dispatch(setActive(false));
  }

  return (
    <div id="hates" className={`${active ? 'active' : ''}`}>
      <span onClick={hide}><i className="fa-solid fa-x"></i></span>
      {Object.entries(hates).map(([ category, hates ]) => (
        <div key={uuid()} className='hate-category'>
          <h2 className='category-title'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <div key={uuid()} className='hates-container'>
            {hates.map((hate) => (
              <Hate key={uuid()} hate={hate}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Hates;