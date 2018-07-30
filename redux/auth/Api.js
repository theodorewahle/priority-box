import firebase from 'firebase';

import { loginUserSuccess, loginUserFail, LOGIN_USER, LOGOUT_USER_SUCCESS } from './Actions';

export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_USER });
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(loginUserSuccess(user));
  } catch (e) {
    dispatch(loginUserFail(e));
  }
};

export const signUpUser = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_USER });
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    dispatch(loginUserSuccess(user));
  } catch (e) {
    dispatch(loginUserFail(e));
  }
};

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER_SUCCESS });
};
