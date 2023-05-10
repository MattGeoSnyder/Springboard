import logo from './logo.svg';
import './App.css';
import Products from './Products';
import data from './data.json'

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
    </Routes>
  );
}

export default App;
