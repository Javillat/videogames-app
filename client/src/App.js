import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route path='/home'><Home /></Route>
      </Switch>
    </div>
  );
}

export default App;
