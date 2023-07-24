import './App.css';
import { useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserHome from './Components/UserHome/UserHome.js';
import Messages from './Components/Sidebar/Messages/Messages';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import ProtectedRoute from './ProtectedRoute';
import { addNotification } from './store/reducers/messages';
// import Hates from './Components/Profile/Hates/Hates';

function App() {
  const userId = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();

  console.log()

  useEffect(() => {

    const ws = new WebSocket(`ws://localhost:3001/users/${userId}`);

    ws.onmessage = function (evt) {
      const data = JSON.parse(evt.data);
      console.log('notification received', data);
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
      console.log(evt.data);
    }

    // return () => { ws.close() }
  }, [userId]);

  return (
    <Routes>
      <Route path='/'/>
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
                        </ProtectedRoute>}/>
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
