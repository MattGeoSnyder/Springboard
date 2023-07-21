import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserHome from './Components/UserHome/UserHome.js';
import Messages from './Components/Profile/Sidebar/Messages/Messages';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Disclaimer from './Components/Disclaimer/Disclaimer';
import { addNotification, addConversationNotification } from './store/reducers/messages';
// import Hates from './Components/Profile/Hates/Hates';

function App() {
  const userId = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();

  console.log()

  const ws = useMemo(() => {
    return new WebSocket(`ws://localhost:3001/notifications/${userId}`);
  }, [userId]);

  useEffect(() => {
    ws.onmessage = function (evt) {
      const data = JSON.parse(evt.data);
      if (userId === data.to_user){
        dispatch(addNotification());
        dispatch(addConversationNotification({ matchId: data.match_id }));
      }
    }
    ws.onopen = function (evt) {
      console.log(`User ${userId} connected to WS`);
    }

    return () => { ws.close() };
  }, [ws]);

  return (
    <Routes>
      <Route path='/'/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='disclaimer' element={<Disclaimer />}/>
      <Route path='/users/:userId' element={<UserHome/>}>
        <Route path='matches/:matchId' element={<Messages />}/>
      </Route>
      <Route path='/users/:userId/profile' element={<Profile id={userId}/>} />
      <Route path='*'/> {/* Not Found Route */}
    </Routes>
  );
}

export default App;
