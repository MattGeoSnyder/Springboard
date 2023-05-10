import './App.css';
import Products from './Products';
import ProductDetail from './ProductDetail';
import { Route, Routes } from 'react-router-dom';
import Cart from './Cart';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route path='cart' element={<Cart />} />
    </Routes>
  );
}

export default App;
