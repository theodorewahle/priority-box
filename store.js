import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './redux/auth/Reducer.js';
import prioritiesReducer from './redux/priorities/Reducer.js';
import decisionsReducer from './redux/decisions/Reducer.js';

const reducers = combineReducers({
  auth: authReducer,
  priorities: prioritiesReducer,
  decisions: decisionsReducer
});

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
