export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGOUT_USER_SUCCESS = 'logout_user_success';

export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGIN_USER = 'login_user';

export const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  console.log('LOGIN SUCES');
  navigation.navigate('App');
};

export const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};
