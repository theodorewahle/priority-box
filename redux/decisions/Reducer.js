import { GET_DECISIONS_SUCCESS, POST_DECISION_SUCCESS } from './Actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DECISIONS_SUCCESS:
      return action.payload;
    case POST_DECISION_SUCCESS:
      return state;
    default:
      return state;
  }
};
