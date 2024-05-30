import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addHate, removeHate } from '../../store/reducers/profileForm';
import './Hate.css';

//One hate icon bubble.
const Hate = ({ hateId, edit }) => {
  const dispatch = useDispatch();
  
  const count = useSelector(state => state.profileForm.formData.hates.length);
  const hate = useSelector(state => state.hatesSidebar.hates[hateId]);
  const active = useSelector(state => state.hatesSidebar.active);

  //handle adding removing hate based on edit privelege
  const handleClick = (e) => {
    e.stopPropagation();
    if (edit) {
      if (active){
        dispatch(removeHate(hateId));
      }
    } else {
      if (count < 5) {
        dispatch(addHate(hateId));
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