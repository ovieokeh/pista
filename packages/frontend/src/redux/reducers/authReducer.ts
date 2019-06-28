import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AuthState,
  SignupTypes,
  LoginTypes
} from '../types';

let initialState: AuthState = {
  error: null,
  loading: false,
  user: null,
  token: ''
};

try {
  const remember = localStorage.getItem('remember');

  if (remember === 'true') {
    initialState = JSON.parse(localStorage.getItem('store') as string).auth;
  }
} catch (error) {
  initialState = {
    error: null,
    loading: false,
    user: null,
    token: ''
  };
}

export function authReducer(
  state = initialState,
  action: SignupTypes | LoginTypes
): AuthState {
  switch (action.type) {
    case SIGNUP_BEGIN:
    case LOGIN_BEGIN: {
      return {
        ...state,
        error: null,
        loading: true,
        user: null,
        token: ''
      };
    }

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.user.user,
        token: action.user.token
      };
    }

    case SIGNUP_ERROR:
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      };
    }

    default: {
      return { ...state };
    }
  }
}
