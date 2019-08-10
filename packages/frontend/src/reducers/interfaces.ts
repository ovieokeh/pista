import { SIGNUP_BEGIN, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT } from './types';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  avatarUrl: string | null;
  hasPendingBudget: boolean;
}

export interface UserFromBackend {
  user: User;
  token: string;
}

interface SignupBegin {
  type: typeof SIGNUP_BEGIN;
}

export interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  data: UserFromBackend;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  data: UserFromBackend;
}

export interface Logout {
  type: typeof LOGOUT;
}

export interface AuthState {
  user: User | null;
  token: string;
}

export interface TestAction {
  type: 'test';
}

export type AuthTypes =
  | SignupBegin
  | SignupSuccess
  | LoginSuccess
  | Logout
  | TestAction;
