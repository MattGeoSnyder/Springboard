import { useSelector, useDispatch } from 'react-redux';
import { setActive, setContent } from '../../../store/reducers/hatesSidebar';
import { Link } from 'react-router-dom';
import Hate from '../Hate';
import { v4 as uuid } from 'uuid';
import './UserHates.css'

const UserHates = () => {
  const dispatch = useDispatch();

  const hatesIds = useSelector(state => state.profileForm.formData.hates);
  const editable = useSelector(state => state.currentUser.editable);

  // toggle edit on click. Block if user != currentUser
  const showHates = (e) => {
    e.stopPropagation();
    console.log('is editable', editable);
    if (editable) {
      dispatch(setContent('hates'));
      dispatch(setActive(true));
    }
  }

  return (
    <div className="user-hates-container" onClick={showHates}>
      <p>Hates</p>
      {hatesIds.length === 0 && <p style={{fontSize: '16px', color: 'gray'}}>Click here to add what irks you</p>}
        <div className="user-hates"> 
          {hatesIds.map((id) => (
            <Hate key={uuid()} hateId={id} edit={editable}/>
            ))}
        </div>  
    </div>
  )
}

export default UserHates;