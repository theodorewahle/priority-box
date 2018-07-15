import api from '../../utils/api';

export const GET_ALL_JOBS_SUCCESS = 'GET_ALL_JOBS_SUCCESS';
export const GET_PENDING_JOBS_SUCCESS = 'GET_PENDING_JOBS_SUCCESS';

export const getAllJobsSuccess = data => ({
  type: GET_ALL_JOBS_SUCCESS,
  payload: data
});

export const getPendingJobsSuccess = data => ({
  type: GET_PENDING_JOBS_SUCCESS,
  payload: data
});
export const getAllJobs = () => async dispatch => {
  try {
    let response = await api.getAllJobs();
    if (response.status === 200) {
      dispatch(getAllJobsSuccess(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPendingJobs = user_id => async dispatch => {
  try {
    let response = await api.getPendingJobs(user_id);
    if (response.status === 200) {
      dispatch(getPendingJobsSuccess(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};
const initialState = {
  allJobs: [{}],
  pendingJobs: [{}]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_JOBS_SUCCESS:
      return { ...state, allJobs: action.payload };
    case GET_PENDING_JOBS_SUCCESS:
      return { ...state, pendingJobs: action.payload };
    default:
      return state;
  }
}
