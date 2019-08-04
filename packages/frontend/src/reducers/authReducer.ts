import { SIGNUP_SUCCESS, SIGNUP_BEGIN } from './types';
import { AuthState, SignupTypes } from './interfaces';

export function authReducer(state: AuthState, action: SignupTypes): AuthState {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      console.log(action);
      return {
        user: action.data.user,
        token: action.data.token
      };

    default:
      return { ...state };
  }
}
