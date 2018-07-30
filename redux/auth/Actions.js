export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGOUT_USER_SUCCESS = 'logout_user_success';

export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGIN_USER = 'login_user';

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text
});

export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const loginUserFail = e => ({
  type: LOGIN_USER_FAIL,
  error: e
});
