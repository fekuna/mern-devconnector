import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.id !== undefined,
        user: action.payload
      };
    default:
      return state;
  }
};
