import { useState } from 'react';
import Button from './components/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import StartGame from './components/StartGame';
import Game from './components/Question';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <p>Hello world {counter}</p>
      <Button onClick={() => setCounter((c) => c + 1)}>Increment</Button>
      <Router>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/game-over">Game over</Route>
          <Route path="/">
            <StartGame />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
