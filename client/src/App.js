import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

import Layout from './containers/Layout/Layout';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
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

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // TODO: Clear current profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={LandingPage} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(withRouter(App));
