import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AuthState,
  BudgetState,
  SignupTypes,
  LoginTypes
} from '../types';

export interface iState {
  auth: AuthState;
  budget: BudgetState;
}
const baseState: iState = {
  auth: {
    error: null,
    loading: false,
    user: null,
    token: ''
  },
  budget: {
    budget: null,
    loading: false,
    error: null
  }
};

const initialState: AuthState = baseState.auth;

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
      return state;
    }
  }
}
