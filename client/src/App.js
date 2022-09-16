import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
      </Switch>
    </div>
  );
}

export default App;
