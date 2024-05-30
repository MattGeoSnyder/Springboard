import JokeListClass from "./JokeListClass";
import './Joke.css';
function App() {
  return (
    <div className="App">
      <JokeListClass numJokesToGet={10}/>
    </div>
  );
}

export default App;
