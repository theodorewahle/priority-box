import { combineReducers } from 'redux';
import jobsReducer from './modules/jobs'


const reducers = {
  jobs: jobsReducer
};

const combinedReducers = combineReducers(reducers, {});

export default function mainReducer(state, action) {
  return combinedReducers(state, action);
}
