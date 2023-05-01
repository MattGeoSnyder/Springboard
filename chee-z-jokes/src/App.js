import React from "react-dom/client";
import JokeListClass from "./JokeListClass";

function App() {
  return (
    <div className="App">
      <JokeListClass numJokesToGet={10}/>
    </div>
  );
}

export default App;
