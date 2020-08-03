import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

// Components
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Form from './pages/Form';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Form} />
      </Switch>
    </div>
  );
};

export default App;
