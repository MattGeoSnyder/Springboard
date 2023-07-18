import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setActive } from '../../../store/reducers/hatesSidebar';
import Hate from '../Hate';
import API from '../../../api';
import { v4 as uuid } from 'uuid';
import './Hates.css';


const Hates = () => {

  // const [ hates, setHates ] = useState([]);
  const active = useSelector(state => state.hatesSidebar.active);
  const dispatch = useDispatch();

  const hates = useSelector(state => state.hatesSidebar.hates);

  const sortedHates = Object.values(hates).reduce((acc, hate) => {
    if (hate.category in acc) {
      return ({...acc, [hate.category]: [...acc[hate.category], hate.id]})
    } else {
      return ({...acc, [hate.category]: [hate.id]})
    }
  }, {})

  const hide = (e) => {
    e.stopPropagation();
    dispatch(setActive(false));
  }

  return (
    <div id="hates" className={`${active ? 'active' : ''}`}>
      <span onClick={hide}><i className="fa-solid fa-x"></i></span>
      {Object.entries(sortedHates).map(([category, hates]) => (
        <div key={uuid()} className='hate-category'>
          <h2 className='category-title'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <div key={uuid()} className='hates-container'>
            {hates.map((id) => (
              <Hate key={uuid()} hateId={id}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Hates;