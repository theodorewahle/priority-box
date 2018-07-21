import firebase from 'firebase';

import { loginUserSuccess, loginUserFail, LOGIN_USER, LOGOUT_USER_SUCCESS } from './Actions';

/*
export const loginUser = ( email, password, navigation ) => async dispatch => {
  dispatch({ type: LOGIN_USER });
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    loginUserSuccess(dispatch, user, navigation)
  }
  catch (e) {
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      loginUserSuccess(dispatch, newUser)
    }
    catch (e) {
      loginUserFail(dispatch, e)
    }
  }

}
*/

export const loginUser = (email, password, navigation) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
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
