import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import profileReducer from './reducers/profileReducer'

const initialState = {};

const middleware = [ thunk ];

const rootReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer
});

const store = createStore(
	rootReducer,
	initialState,
	compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
