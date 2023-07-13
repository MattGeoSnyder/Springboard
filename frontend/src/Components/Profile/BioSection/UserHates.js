import { useSelector, useDispatch } from 'react-redux';
import { setActive } from '../../../store/reducers/hatesSidebar';
import Hate from '../Hate';
import { v4 as uuid } from 'uuid';
import './UserHates.css'

const UserHates = () => {
  const dispatch = useDispatch();

  const hates = useSelector(state => state.profileForm.formData.hates);
  const editable = useSelector(state => state.currentUser.editable);

  const showHates = (e) => {
    e.stopPropagation();
    if (editable) {
      dispatch(setActive(true));
    }
  }

  return (
    <div className="user-hates-container">
      <p>Hates</p>
      {hates.length === 0 && <p>Click here to add what irks you</p>}
      <div className="user-hates" onClick={showHates}>
        {hates.map((hate) => (
          <Hate key={uuid()} hate={hate} edit={true}/>
        ))}
      </div>  
    </div>
  )
}

export default UserHates;