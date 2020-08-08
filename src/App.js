import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

// Components
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => unsubscribeFromAuth();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/register"
          render={() => (!currentUser ? <Register /> : <Redirect to="/home" />)}
        />
        <Route
          path="/login"
          render={() => (!currentUser ? <Login /> : <Redirect to="/home" />)}
        />
        <Route
          exact
          path="/home"
          render={() => (currentUser ? <Home /> : <Redirect to="/login" />)}
        />
      </Switch>
    </div>
  );
};

export default App;
