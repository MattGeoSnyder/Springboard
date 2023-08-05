import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/thunks';
import { setErrMsg, setStatus } from '../../store/reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../Forms/Input"
import couple from '../../assets/images/valentines-day.svg';
import './Login.css';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(state => state.user.status);
  const userId = useSelector(state => state.user.user.id);
  const errMsg = useSelector(state => state.user.errMsg);

  //React to submission status. 
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

  //Initial form data for login
  const initialData = {
    username: '',
    pw: ''
  }

  const [ formData, setFormData ] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    if (Object.values(formData).every(val => val)){
      dispatch(login(formData));
    }
  }

  
  return (
    <div id="login-page">
      <div id='welcome'>
        <h1>Welcome Back</h1>
        <div>
          <img src={couple}/>
        </div>
      </div>
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
            placeholder='Password'
            value={formData.pw}
            setFormData={setFormData}
            iconClass='fa-solid fa-key'
          />
            {status === 'pending' && <i className="fa-solid fa-spinner loader"></i>}
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