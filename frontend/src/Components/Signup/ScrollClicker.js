import { useState } from 'react';
import './ScrollClicker.css';

const ScrollClicker = ({ page, setPage }) => {

  const handlePrevClick = () => {
    if (page > 0) {
      setPage(state => state - 1);
    }
  }

  const handleNextClick = () => {
    if (page < 2) {
      setPage(state => state + 1);
    }
  }

  return (
    <div id="scroll-clicker">
      <i className="fa-solid fa-arrow-left fa-2x" onClick={handlePrevClick}></i>
      <div>
        <div className={`dot ${page === 0 ? 'active' : ''}`}></div>
        <div className={`dot ${page === 1 ? 'active' : ''}`}></div>
        <div className={`dot ${page === 2 ? 'active' : ''}`}></div>
      </div>
      <i className="fa-solid fa-arrow-right fa-2x" onClick={handleNextClick}></i>
    </div>
  )
}

export default ScrollClicker;