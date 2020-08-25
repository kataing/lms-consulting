import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

// Components
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Discovery from './pages/Discovery/Discovery';
import EditDiscovery from './pages/EditDiscovery/EditDiscovery';

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
      <Redirect from="/" to="/login" />
      <Switch>
        <Route
          path="/register"
          render={() =>
            !currentUser ? <Register /> : <Redirect to="/discovery-form" />
          }
        />
        <Route
          path="/login"
          render={() =>
            !currentUser ? <Login /> : <Redirect to="/discovery-form" />
          }
        />
        <Route
          exact
          path="/discovery-form"
          render={() =>
            currentUser ? <Discovery /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/edit-form"
          render={() =>
            currentUser ? <EditDiscovery /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/add-lms"
          render={() =>
            currentUser ? <EditDiscovery /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/edit-lms"
          render={() =>
            currentUser ? <EditDiscovery /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
