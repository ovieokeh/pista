import { History } from 'history';

export interface iProps {
  dispatch: any;
  history: History;
}

export interface iState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  firstNameErrors: string;
  lastNameErrors: string;
  emailErrors: string;
  passwordErrors: string;
  isLoading: boolean;
  success: boolean;
  [x: string]: any;
}
