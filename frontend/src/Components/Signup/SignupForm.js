import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../store/thunks';
import { setStatus, setErrMsg } from '../../store/reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Forms/Input';
import ScrollClicker from './ScrollClicker';
import moment from 'moment';
import './SignupForm.css';

const SignupForm = ({ page, setPage }) => {

  const form = useRef(null);
  const [ tops, setTops ] = useState([0, 100, 200]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errMsg = useSelector(state => state.user.errMsg);
  const userId = useSelector(state => state.user.user.id);
  const status = useSelector(state => state.user.status);

  useEffect(() => {
    setTops([0, 100, 200].map((val) => page * -100 + val));
  }, [page]);

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(setStatus('idle'));
      setTimeout(() => {
        dispatch(setErrMsg(''));
      }, 5000);
    }  else if (status === 'success') { 
        dispatch(setStatus('idle'));
        navigate(`/disclaimer`);
    }
  }, [status])

  const initialData = {
    username: 'MattGeoSnyder',
    pw: 'Fakepw1234',
    pw_ver: 'Fakepw1234',
    first_name: 'Matt',
    birthday: '1996-08-11',
    user_sex: 'male',
    sex_preference: 'female'
  }

  const [formData, setFormData] = useState(initialData);
  const [ valid, setValid ] = useState({
    // set to true for testing. Change later.
    username: false,
    //Todo: fix pw_ver
    pw_ver: true,
    first_name: true,
    birthday: true
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (Object.values(valid).every(val => val)){
      dispatch(register(formData));
    }
  }

  const preventTabAndEnter = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
    }
  }

  const renderButton = () => {
      switch (status) {
        case 'pending':
          return (<i className="fa-solid fa-spinner .loader"></i>);
      
        default:
          return (<button id='signup-button'>Sign up</button>);
      }
  }

  return (
    <div id='signup-form'>
      <form onSubmit={handleSubmit} ref={form} onKeyDown={preventTabAndEnter}>
        <div className='page' style={{top: `${tops[0]}%`}}>
          <section className='title-box'>
            <h1 className='title'>Sign up</h1>
            <p className='subtitle'>Get started with Haters now</p>
          </section>
          <Input
            labelText='Username' 
            placeholder='Create your username'
            name='username'
            value={formData.username}
            validationMsg='Username not valid'
            iconClass="fa-solid fa-user"
            conditions={[
              [formData.username.length > 6, 'Username must be at least 6 characters'],
              [formData.username.length < 16, 'Username must be 15 charachters or less']
            ]}
            setFormData={setFormData}
            setValid={setValid}
          />
          <Input 
            labelText='Password'
            name='pw'
            type='password'
            value={formData.pw}
            iconClass='fa-solid fa-key'
            setFormData={setFormData}
          />
          <Input 
            labelText='Confirm your password'
            name='pw_ver'
            type='password'
            value={formData.pw_ver}
            validationMsg='Password Invalid'
            iconClass='fa-solid fa-lock'
            conditions={[
              [formData.pw === formData.pw_ver, "Password do not match"],
              [/[a-z]/.test(formData.pw), 'Password must contain at least one letter'],
              [/\d/.test(formData.pw), 'Password must contain at least one number'],
              [/[A-Z]/.test(formData.pw), 'Password must contain at least one upper case letter'],
              [formData.pw.length > 8, 'Password must be at least 8 characters'],
              [formData.pw.length < 21, "Password can't be longer than 20 characters"]
            ]}
            setFormData={setFormData}
            //Todo: Fix pw_ver
            setValid={setValid}
          />
        </div>
        <div className='page' style={{top: `${tops[1]}%`}}>
          <section>
            <h1 className='title'>Tell us about yourself</h1>
            <p className='subtitle'>Your name and age are public</p>
          </section>
          <Input
            labelText='First name' 
            placeholder='Tell us your name'
            name='first_name'
            value={formData.first_name}
            iconClass='fa-solid fa-id-card'
            conditions={[
              [formData.first_name.length > 1, "Name must be at least 2 characters"],
              [formData.first_name.length < 21, "Name can't be longer than 20 characters"],
              [!/[^a-zA-Z]/g.test(formData.first_name), "Name can only contain letters"]
            ]}
            validationMsg='First Name Invalid'
            setFormData={setFormData}
            setValid={setValid}
          />
          <Input
            labelText='Birthday' 
            placeholder='birthday'
            name='birthday'
            type='date'
            value={formData.birthday}
            validationMsg='Birthday Invalid'
            conditions={[
              [moment().add(-18, 'years') >= moment(formData.birthday),
              'Must be 18 or older']
            ]}
            setFormData={setFormData}
            setValid={setValid}
          />
        </div>
        <div className='page' style={{top: `${tops[2]}%`}}>
          <section>
            <h1 className='title'>What are you looking for?</h1>
            <p className='subtitle'>Help us find your match</p>
          </section>
          <div className='select'>
            <label>I am a </label>
            <select 
              name='user_sex'
              value={formData.value}
              onChange={handleChange}
            >
              <option value='female'>Woman</option>
              <option value='male'>Man</option>
            </select>
            <label> looking for a </label>
            <select
              name='sex_preference'
              value={formData.sex_preference}
              onChange={handleChange}
            >
            <option value='female'>Woman</option>
            <option value='male'>Man</option>
          </select>
          </div>
          <div id='button-bar'>{renderButton()}</div>
        </div>
      </form>
      <div id='login-prompt'>Already have an account? Login <Link to={'/login'}>here</Link></div>
      <ScrollClicker page={page} setPage={setPage}/>
      {errMsg && <p id='err-msg'>{errMsg}</p>}
    </div>
  )
}

export default SignupForm;