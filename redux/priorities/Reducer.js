import { GET_PRIORITIES_SUCCESS, POST_PRIORITY_SUCCESS } from './Actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRIORITIES_SUCCESS:
      return action.payload;
    case POST_PRIORITY_SUCCESS:
      return state;
    default:
      return state;
  }
};
