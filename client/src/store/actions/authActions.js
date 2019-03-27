import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import * as actionTypes from './actionTypes';

import jwtDecode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set Token to LocalStorage
      localStorage.setItem('jwtToken', token);
      // Set Token to Auth Header
      setAuthToken(token);
      // Decode Token to get User Data
      const decoded = jwtDecode(token);
      // Set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged In user
export const setCurrentUser = decoded => {
  return { type: actionTypes.SET_CURRENT_USER, payload: decoded };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove Token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
