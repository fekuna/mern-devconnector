import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
		}
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.onLoginUser(userData)
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.submitHandler}>
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
                    value={this.state.email}
                    onChange={e => this.inputChangeHandler(e)}
                  />
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
                    value={this.state.password}
                    onChange={e => this.inputChangeHandler(e)}
                  />
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
Login.propTypes = {
  onLoginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  onLoginUser: userData => dispatch(actions.loginUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
