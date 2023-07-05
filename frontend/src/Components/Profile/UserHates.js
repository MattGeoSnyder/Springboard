import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postHates } from '../../store/reducers/profileForm';
import { setActive } from '../../store/reducers/hatesSidebar';
import Hate from './Hate';
import { v4 as uuid } from 'uuid';
import './UserHates.css'

const UserHates = () => {
  const dispatch = useDispatch();

  //Todo: update userId away from testuser id
  const userId = useSelector(state => state.user.testuser.id);
  const hates = useSelector(state => state.profileForm.formData.hates);
  const status = useSelector(state => state.profileForm.status);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(postHates({ hates, userId }));
    }
  }, [status, hates])

  const showHates = (e) => {
    e.stopPropagation();
    dispatch(setActive(true));
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