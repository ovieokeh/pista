import { SignupSuccess, AuthState, Logout } from './interfaces';

export const signupAction: SignupSuccess = {
  type: 'signup success',
  data: {
    user: {
      id: '123456',
      firstName: 'Buzz',
      lastName: 'Lightyear',
      email: 'buzz@lightyear.com',
      createdAt: 'whatever',
      avatarUrl: null,
      hasPendingBudget: false,
    },
    token: 'faketoken',
  },
};

export const logoutAction: Logout = {
  type: 'logout',
};

export const initialAuthState: AuthState = {
  user: null,
  token: '',
};
