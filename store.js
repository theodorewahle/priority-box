import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './redux/auth/Reducer.js';
import prioritiesReducer from './redux/priorities/Reducer.js';

const reducers = combineReducers({
  auth: authReducer,
  priorities: prioritiesReducer
});

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
