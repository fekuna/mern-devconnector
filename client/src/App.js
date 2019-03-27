import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/authActions';

import Layout from './containers/Layout/Layout';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import store from './store/store';

import './App.css';

// Check for Token
if (localStorage.jwtToken) {
  // Set auth Token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={LandingPage} />
      </Switch>
    );

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default App;
