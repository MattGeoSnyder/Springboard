import logo from './logo.svg';
import './App.css';
import Products from './Products';
import data from './data.json';
import ProductDetail from './ProductDetail';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
