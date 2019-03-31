import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProfileActions from './ProfileActions';

import * as actions from '../../store/actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onGetProfile();
  }

  onDeleteAccount = (e) => {
    this.props.onDeleteAccount()
  }

  render() {
    let dashboardContent;
    if (this.props.profile.profile === null || this.props.profile.loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check logged in user has profile data
      // console.log(this.props.profile.profile);
      if (Object.keys(this.props.profile.profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{' '}
              <Link to={`/profile/${this.props.profile.profile.handle}`}>
                {this.props.auth.user.name}
              </Link>
            </p>
            <ProfileActions />
            {/* TODO: exp and edu */}
            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteAccount.bind(this)} className="btn btn-danger">Delete My Account</button>
          </div>
        );
      } else {
        // User loggedIn but has no profile
        dashboardContent = (
          <Fragment>
            <p className="lead text-muted">
              Welcome {this.props.auth.user.name}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </Fragment>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onGetProfile: () => dispatch(actions.getCurrentProfile()),
  onDeleteAccount: () => dispatch(actions.deleteAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
