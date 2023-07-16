import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActive, setContent } from '../store/reducers/hatesSidebar';

import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const active = useSelector(state => state.hatesSidebar.active);
  
  const handleClick = (e) => {
    console.log('showing sidebar');
    dispatch(setContent('conversations'));
    dispatch(setActive(!active));
  }

  return (
    <nav id="navbar">
      <div onClick={handleClick}>
        <i className="fa-solid fa-message"></i>
      </div>
    </nav>
  )
}


export default Navbar;