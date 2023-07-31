import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Components/Home/Home';
import UserHome from './Components/UserHome/UserHome.js';
import Messages from './Components/Sidebar/Messages/Messages';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import ProtectedRoute from './ProtectedRoute';
import { addNotification } from './store/reducers/messages';
import { useLocalStorage } from './hooks/useLocalStorage';
import { loadTokenUser } from './store/reducers/user';
import { loadUserAssets } from './store/thunks';
// import Hates from './Components/Profile/Hates/Hates';

const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';

function App() {
  const user = useSelector(state => state.user.user);
  const userId = user.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ get, set, remove ] = useLocalStorage();


  useEffect(() => {
    const lsUser = get() || {};

    if (lsUser.id) {
      dispatch(loadTokenUser(lsUser));
      dispatch(loadUserAssets(lsUser.id));
      navigate(`/users/${lsUser.id}`);
    }
  }, []);

  useEffect(() => {
    set(user);
  }, [user]);

  useEffect(() => {

    if (!userId) return;

    const ws = new WebSocket(`${WS_BASE_URL}/users/${userId}`);

    ws.onmessage = function (evt) {
      const data = JSON.parse(evt.data);
      dispatch(addNotification(data));
    }

    ws.onopen = function (evt) {
      console.log(`User ${userId} connected to WS`);
      if (ws.readyState === 1) {
        ws.send(JSON.stringify({ type: 'join' }));
      }
    }

    ws.onclose = function (evt) {
      console.log(`User ${userId} disconnected from WS`);
    }

    ws.onerror = function (evt) {
      console.log(evt);
    }

    // return () => { ws.close() }
  }, [userId]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='disclaimer' 
            element={<ProtectedRoute> 
                        <Disclaimer /> 
                      </ProtectedRoute>}/>
      <Route path='/users/:userId' 
            element={<ProtectedRoute>
                        <UserHome/>
                      </ProtectedRoute>}>
        <Route path='matches/:matchId' 
              element={<ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>}
        />
      </Route>
      <Route path='/users/:userId/profile' 
            element={<ProtectedRoute>
                        <Profile id={userId}/>
                      </ProtectedRoute>}
      >
        <Route path='matches/:matchId' 
              element={<ProtectedRoute>
                          <Messages />
                        </ProtectedRoute>}/>
      </Route>
      <Route path='*'/> {/* Not Found Route */}
    </Routes>
  );
}

export default App;
