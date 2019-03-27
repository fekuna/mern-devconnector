import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.onRegisterUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      !this.state.errors.name
                        ? 'form-control form-control-lg'
                        : 'form-control form-control-lg is-invalid'
                    }
                    placeholder="Name"
                    name="name"
                    onChange={e => this.inputChangeHandler(e)}
                    value={this.state.name}
                  />
                  {this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={
                      !this.state.errors.email
                        ? 'form-control form-control-lg'
                        : 'form-control form-control-lg is-invalid'
                    }
                    placeholder="Email Address"
                    name="email"
                    onChange={e => this.inputChangeHandler(e)}
                    value={this.state.email}
                  />
                  {this.state.errors.email && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      !this.state.errors.password
                        ? 'form-control form-control-lg'
                        : 'form-control form-control-lg is-invalid'
                    }
                    placeholder="Password"
                    name="password"
                    onChange={e => this.inputChangeHandler(e)}
                    value={this.state.password}
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      !this.state.errors.password2
                        ? 'form-control form-control-lg'
                        : 'form-control form-control-lg is-invalid'
                    }
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={e => this.inputChangeHandler(e)}
                    value={this.state.password2}
                  />
                  {this.state.errors.password2 && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  onRegisterUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  onRegisterUser: (userData, history) =>
    dispatch(actions.registerUser(userData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
