import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LandingPage from './components/LandingPage/LandingPage';
import CreateProfile from './containers/CreateProfile/CreateProfile';
import Layout from './containers/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import Register from './containers/Auth/Register';
import * as actions from './store/actions';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/create-profile" exact component={CreateProfile} />
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Redirect to="/dashboard" />
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
});

const mapDispatchToProps = dispatch => ({
  onTryAutoLogin: () => dispatch(actions.authCheckLoginUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
