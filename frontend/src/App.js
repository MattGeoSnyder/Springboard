import logo from './logo.svg';
import './App.css';
// import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHome from './Components/UserHome/UserHome.js';
import Conversations from './Components/UserHome/Conversations/Conversations';
import Messages from './Components/UserHome/Messages/Messages';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path='/'/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/profile' element={<Profile />} />
      <Route path='disclaimer'/>
      <Route path='/users/:userId' element={<UserHome/>}>
        <Route path='' element={<Conversations/>}/>
        <Route path='matches/:matchId' element={<Messages/>}/>
        <Route path='*'/>
      </Route>
      <Route path='*'/> {/* Not Found Route */}
    </Routes>
  );
}

export default App;
