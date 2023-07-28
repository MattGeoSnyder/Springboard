import { useSelector, useDispatch } from 'react-redux';
import { setLikes } from '../../../store/reducers/currentUser';
import { addLike, addDislike } from '../../../store/reducers/matches';
import './ButtonBar.css';

const ButtonBar = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.user.id);
  const currentUserId = useSelector(state => state.currentUser.user.id);

  //Trigger dislike event
  const clickDislike = () => {
    dispatch(setLikes(false));
    dispatch(addDislike({ userId, currentUserId}));
  }

  //Trigger like event 
  const clickLike = () => {
    dispatch(setLikes(true));
    dispatch(addLike({ userId, currentUserId}));
  }

  return (
    <div id="button-bar">
      <div id="dislike" onClick={clickDislike}><i className="fa-regular fa-thumbs-down"></i></div>
      <div id="like" onClick={clickLike}><i className="fa-regular fa-thumbs-up"></i></div>
    </div>
  )
}

export default ButtonBar;