import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import VendingMachine from './VendingMachine';
import Snack from './Snack';

function App({ snacks }) {
  console.log(snacks)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<VendingMachine/>} />
          <Route path='/chips' element={<Snack snack={snacks[0]}/>}/>
          <Route path='/soda' element={<Snack snack={snacks[1]}/>} />
          <Route path='/ice-cream' element={<Snack snack={snacks[2]}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

App.defaultProps = {
  snacks: [
    {
      name: 'Chips',
      image: 'https://m.media-amazon.com/images/I/813axPlVxBL.jpg'
    },
    {
      name: 'Soda',
      image: 'https://m.media-amazon.com/images/I/81P16G7B6EL.jpg'
    },
    {
      name: 'Ice Cream',
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSWs783jt4zs-kLk6xdqXOUPtMIdjmaI0BIwZ2EaGFRq-A2rATybVlOIC6z3NP6O6DcX8O02DB9iGQ1l0iO-kr-5s-1pKYCxZpJF1NB4yNthxl5KDLIcGGUs6c'
    }
  ]
}

export default App;
