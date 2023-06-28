import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../store/reducers/user';
import { useNavigate } from 'react-router-dom';
import Input from "../Forms/Input"
import './Login.css';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.user.status);
  const userId = useSelector(state => state.user.user.id);
  const errMsg = useSelector(state => state.user.errMsg);

  console.log(errMsg);


  useEffect(() => {
    if (status === 'success') {
      navigate(`/users/${userId}`);
    }
  }, [status])


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
        <p>Don't have an account? Sign up <a href="#">here</a></p>
        <form onSubmit={handleSubmit}>
          <Input 
            name='username'
            placeholder='Username'
            value={formData.username}
            setFormData={setFormData}
            iconClass=''
          />
          <Input 
            name='pw'
            type='password'
            value={formData.pw}
            setFormData={setFormData}
            iconClass=''
          />
            {status === 'pending' && <i className="fa-solid fa-spinner"></i>}
            {status === 'rejected' && <p>{errMsg}</p>}
            {status !== 'pending' && <button>Login</button>}
        </form>
      </div>
    </div>
  )
}

export default Login;