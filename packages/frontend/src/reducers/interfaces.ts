import { SIGNUP_BEGIN, SIGNUP_SUCCESS } from './types';

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

interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  data: UserFromBackend;
}

export interface AuthState {
  user: User | null;
  token: string;
}

export type SignupTypes = SignupBegin | SignupSuccess;
