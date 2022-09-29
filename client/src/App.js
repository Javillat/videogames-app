import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing';
import Home from './components/Home';
import Details from './components/Details';
import CreateVideogame from './components/CreateVideogame';
//import '../src/css/App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route path='/home'><Home /></Route>
        <Route path='/detail/:id'><Details /></Route>
        <Route path='/create'><CreateVideogame /></Route>
      </Switch>
    </div>
  );
}

export default App;
