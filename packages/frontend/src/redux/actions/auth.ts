import Axios from 'axios';
import { Dispatch } from 'redux';
import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  UserDetails,
  LoginCredentials,
  UserFromBackend,
  SignupTypes,
  LoginTypes
} from '../types';

// ==================== Signup action creators ====================
const signupBegin = (): SignupTypes => ({ type: SIGNUP_BEGIN });
const signupSuccess = (user: UserFromBackend): SignupTypes => ({
  type: SIGNUP_SUCCESS,
  user
});
const signupError = (error: any): SignupTypes => ({
  type: SIGNUP_ERROR,
  error
});

// ==================== Login action creators ====================
const loginBegin = (): LoginTypes => ({ type: LOGIN_BEGIN });
const loginSuccess = (user: UserFromBackend): LoginTypes => ({
  type: LOGIN_SUCCESS,
  user
});
const loginError = (error: any): LoginTypes => ({
  type: LOGIN_ERROR,
  error
});

// ==================== Async requests ====================
export const signupRequest = (userDetails: UserDetails) => async (
  dispatch: Dispatch
) => {
  const url = `${process.env.REACT_APP_API_URL}/signup`;

  try {
    dispatch(signupBegin());

    const response = await Axios.post(url, userDetails);
    dispatch(signupSuccess(response.data.data));
  } catch (error) {
    dispatch(signupError(error.response.data));
  }
};

export const loginRequest = (credentials: LoginCredentials) => async (
  dispatch: Dispatch
) => {
  const url = `${process.env.REACT_APP_API_URL}/login`;

  try {
    dispatch(loginBegin());

    const response = await Axios.post(url, credentials);
    dispatch(loginSuccess(response.data.data));
  } catch (error) {
    dispatch(loginError(error.response.data));
  }
};
