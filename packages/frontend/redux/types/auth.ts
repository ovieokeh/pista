export const SIGNUP_BEGIN = 'SIGNUP_BEGIN';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  accepted?: boolean;

  [propName: string]: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

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

export interface AuthState {
  user: User | null;
  error: any;
  loading: boolean;
  token: string;
}

interface SignupBegin {
  type: typeof SIGNUP_BEGIN;
}

interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  user: UserFromBackend;
}

interface SignupError {
  type: typeof SIGNUP_ERROR;
  error: any;
}

interface LoginBegin {
  type: typeof LOGIN_BEGIN;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  user: UserFromBackend;
}

interface LoginError {
  type: typeof LOGIN_ERROR;
  error: any;
}

export type SignupTypes = SignupBegin | SignupSuccess | SignupError;
export type LoginTypes = LoginBegin | LoginSuccess | LoginError;
