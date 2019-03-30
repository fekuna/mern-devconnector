import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.onClearCurrentProfile()
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logoutUser()),
  onClearCurrentProfile: () => dispatch(actions.clearCurrentProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
