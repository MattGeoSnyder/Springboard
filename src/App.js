import './App.css';
import {Route, Routes} from 'react-router-dom';
import NewPost from './Components/Forms/NewPost';
import PostDetail from "./Components/Posts/PostDetail";
import Posts from './Components/Posts/Posts';

function App() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/new' element={<NewPost />} />
      <Route path='/post/:id' element={<PostDetail />}/>
    </Routes>
  );
}

export default App;
