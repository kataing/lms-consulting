import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

// Components
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
