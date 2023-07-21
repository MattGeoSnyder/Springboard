import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, setErrMsg, setStatus } from '../../store/reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../Forms/Input"
import './Login.css';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.user.status);
  const userId = useSelector(state => state.user.user.id);
  const errMsg = useSelector(state => state.user.errMsg);

  useEffect(() => {
    if (status === 'success') {
      navigate(`/users/${userId}`);
    } else if (status === 'rejected') {
      setTimeout(() => {
        dispatch(setStatus('idle'));
        dispatch(setErrMsg(''));
      }, 5000);
    }
  }, [status, userId, navigate]);

  const initialData = {
    username: 'rachwake23',
    pw: 'Imgay232023'
  }

  const [ formData, setFormData ] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    if (Object.values(formData).every(val => val)){
      dispatch(authUser(formData));
    }
  }

  return (
    <div id="login-page">
      <div id="login">
        <h1>Login</h1>
        <p>Don't have an account? Sign up <Link to={'/signup'}>here.</Link></p>
        <form onSubmit={handleSubmit}>
          <Input 
            name='username'
            placeholder='Username'
            labelText='Username'
            value={formData.username}
            setFormData={setFormData}
            iconClass='fa-solid fa-user'
          />
          <Input 
            name='pw'
            type='password'
            labelText='Password'
            value={formData.pw}
            setFormData={setFormData}
            iconClass='fa-solid fa-key'
          />
            {status === 'pending' && <i className="fa-solid fa-spinner"></i>}
            {status !== 'pending' && <button>Login</button>}
        </form>
        <div id='err-msg'>
          {status === 'rejected' && <p>{errMsg}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login;