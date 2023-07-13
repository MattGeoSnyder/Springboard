import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, setStatus } from '../../../store/reducers/user';
import './ProfileButton.css';

const ProfileButton = () => {
  const dispatch = useDispatch();

  const status = useSelector(state => state.user.status);
  const formData = useSelector(state => state.profileForm.formData);
  const userId = useSelector(state => state.user.user.id);

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(updateProfile({ formData, userId }));
  }

  useEffect(() => {
    if (status === 'success' || status === 'rejected') {
      setTimeout(() => {
        dispatch(setStatus('idle'));
      }, 3000);
    }
  }, [status, dispatch])

  const render = () => {
    switch (status) {
      case 'pending':
        return <div id='spinner-container'><i className="fa-solid fa-spinner"></i></div>
      case 'success':
        return <div id='status-message' className='success'><p>Your profile was updated successfully</p></div>
      case 'rejected':
        return <div id='status-message' className='rejected'><p>Your profile could not be updated</p></div>
      default:
        return <button onClick={handleClick}>Update Profile</button>
    }
  }

  return render();

}

export default ProfileButton;