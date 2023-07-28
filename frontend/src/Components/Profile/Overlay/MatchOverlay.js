import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { setOverlayActive } from '../../../store/reducers/overlay';
import { setActive, setContent } from '../../../store/reducers/hatesSidebar';
import './MatchOverlay.css';



//Displays on top of overlay when two users match.
const MatchOverlay = () => {
  const dispatch = useDispatch();
  const matchId = useSelector(state => state.overlay.matchId);
  const matchedUser = useSelector(state => state.matches.matches[matchId]);
  const user = useSelector(state => state.user.user);
  const matchedUserPhoto = matchedUser.photos.photo1.image_url;

  //Just disables the overlay.
  const clickContinueSwiping = (e) => {
    e.stopPropagation();
    dispatch(setOverlayActive(false));
  }

  //opens up messaging on click
  const clickMessage = (e) => {
    e.stopPropagation();
    dispatch(setContent('conversations'));
    dispatch(setOverlayActive(false));
    dispatch(setActive(true));
  }

  return (
    <div id="match-overlay">
      <p id="match-message">It's a match!</p>
      <div id='image-wrapper'>
        <img src={matchedUserPhoto}/>
      </div>
      <div id="options-wrapper">
        <div id="options">
          <p onClick={clickContinueSwiping}><i className="fa-solid fa-arrow-left"></i> Continue Swiping</p>
          <p onClick={clickMessage}>Message {matchedUser?.first_name} <i className="fa-solid fa-arrow-right"></i></p>
        </div>
      </div>
    </div>
  )
}

export default MatchOverlay;