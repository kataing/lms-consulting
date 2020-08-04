import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

// Components
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
