import { History } from 'history';

export interface iProps {
  dispatch: any;
  history: History;
}

export interface iState {
  email: string;
  password: string;
  emailErrors: string;
  passwordErrors: string;
  shouldRemember: boolean;
  isLoading: boolean;
  success: boolean;
  [x: string]: any;
}
