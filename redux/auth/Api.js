import firebase from 'firebase';

import { loginUserSuccess, loginUserFail, LOGIN_USER, LOGOUT_USER_SUCCESS } from './Actions';

export const loginUser = (email, password, navigation) => {
  return dispatch => {
    console.log('dispatched');
    dispatch({ type: LOGIN_USER });
    console.log('trying to log in user');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('abou to dispatch success');
        loginUserSuccess(dispatch, user, navigation);
      })
      .catch(error => {
        console.log(error);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigation))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

export const logoutUser = dispatch => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER_SUCCESS });
  };
};
