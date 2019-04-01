import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from '../../components/UI/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../../components/UI/TextAreaFieldGroup/TextAreaFieldGroup';
import InputGroup from '../../components/UI/InputGroup/InputGroup';
import SelectListGroup from '../../components/UI/SelectListGroup/SelectListGroup';
import isEmpty from '../../utils/isEmpty/isEmpty';

import * as actions from '../../store/actions';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUserName: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  componentDidMount() {
    this.props.onGetCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.profile.profile);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Convert skills array to Comma String value
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubUserName = !isEmpty(profile.githubUserName)
        ? profile.githubUserName
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubUserName: profile.githubUserName,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUserName: this.state.githubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.onCreateProfile(profileData, this.props.history);
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // Select options for status
    const statusOptions = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learnign', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    let socialInputs;

    if (this.state.displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.inputChangeHandler}
            error={this.state.errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.inputChangeHandler}
            error={this.state.errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.inputChangeHandler}
            error={this.state.errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.inputChangeHandler}
            error={this.state.errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.inputChangeHandler}
            error={this.state.errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="*Profile Handler"
                  name="handle"
                  type="text"
                  value={this.state.handle}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.handle}
                  info="A unique handle for your profile URL, Your fullname, company name, or nickname"
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={e => this.inputChangeHandler(e)}
                  options={statusOptions}
                  error={this.state.errors.status}
                  info="Give us an idea of where you at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubUserName"
                  value={this.state.githubUserName}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.githubUserName}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={e => this.inputChangeHandler(e)}
                  error={this.state.errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
  onGetCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  onCreateProfile: (profileData, history) =>
    dispatch(actions.createProfile(profileData, history)),
  onGetCurrentProfile: () => dispatch(actions.getCurrentProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfile);
