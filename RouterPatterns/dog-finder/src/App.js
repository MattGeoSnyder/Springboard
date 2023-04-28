import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import {useState} from 'react';
import DogList from './DogList';
import DogDetail from './DogDetail';
import whiskey from './images/whiskey.jpg';
import perry from './images/perry.jpg';
import duke from './images/duke.jpg';
import tubby from './images/tubby.jpg';

function App({dogs}) {
  const [currDog, setCurrDog] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/dogs' element={<DogList dogs={dogs} setCurrDog={setCurrDog}/>}/>
          <Route path='/dogs/:name' element={<DogDetail dogs={dogs}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
}

export default App;
