import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {RouterProvider,
        BrowserRouter,
        createBrowserRouter,
        createRoutesFromElements,
        Route,
        redirect,
        Navigate
        } from 'react-router-dom';
import ColorList from './ColorList';
import AddColor from './AddColor';
import Color from './Color';

function App() {
  const [colors, setColors] = useState([]);

  function getColor({params}) {
    const {name} = params;
    let color = colors.filter(color => color.name === name)[0];
    if (!color) {
      return redirect('/colors');
    }
    return color;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          <Route path='/' element={<Navigate to='/colors' />}/>
          <Route path='colors' element={<ColorList colors={colors}/>}/>
          <Route 
            path='colors/new'
            element={<AddColor setColors={setColors} />}/>
          <Route 
            path='colors/:name' 
            element={<Color />}
            loader={getColor}
          />
          <Route path='/*' element={<Navigate to='colors' />}/>
        </>
    )
  )


  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
