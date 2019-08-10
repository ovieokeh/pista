import { authReducer } from './authReducer';
import { signupAction, logoutAction, initialAuthState } from './fixtures';

describe('Reducers', () => {
  describe('authReducer', () => {
    it('should return initial state', () => {
      const newAuthState = authReducer(undefined, { type: 'test' });
      expect(newAuthState.token).toEqual('');
      expect(newAuthState.user).toEqual(null);
    });

    it('should handle SIGNUP_SUCCESS', () => {
      const newAuthState = authReducer(initialAuthState, signupAction);
      expect(newAuthState.token).toEqual(signupAction.data.token);
      expect(newAuthState.user).toEqual(signupAction.data.user);
    });

    it('should handle LOGOUT', () => {
      const newAuthState = authReducer(initialAuthState, logoutAction);
      expect(newAuthState.token).toEqual('');
      expect(newAuthState.user).toEqual(null);
    });
  });
});
