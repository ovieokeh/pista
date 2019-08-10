import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT } from './types';
import { AuthState, AuthTypes } from './interfaces';

export const initialAuthState: AuthState = {
  user: null,
  token: '',
};

export function authReducer(
  state: AuthState | undefined = initialAuthState,
  action: AuthTypes,
): AuthState {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      const newState = {
        user: action.data.user,
        token: action.data.token,
      };

      return newState;

    case LOGOUT:
      return {
        user: null,
        token: '',
      };

    default:
      return { ...state };
  }
}
