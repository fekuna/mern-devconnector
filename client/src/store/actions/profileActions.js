import axios from 'axios';
import * as actionTypes from './actionTypes';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: {}
      });
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add Education
export const AddEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// DELETE Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// DELETE Experience
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => {
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};
