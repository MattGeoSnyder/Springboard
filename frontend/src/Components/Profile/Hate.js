import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addHate, removeHate } from '../../store/reducers/profileForm';
import './Hate.css';

const Hate = ({ hate, edit }) => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.profileForm.formData.hates.length);
  const active = useSelector(state => state.hatesSidebar.active);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log('clicked');
    if (edit) {
      if (active){
        dispatch(removeHate(hate.id));
      }
    } else {
      if (count < 5) {
        dispatch(addHate(hate));
      }
    }
  }

  return (
    <div className={`hate ${active ? 'active' : ''}`}onClick={handleClick}>
      {hate?.hate}
      {edit && active && <span><i className="fa-solid fa-x del"></i></span>}
    </div>
  )
}

export default Hate;