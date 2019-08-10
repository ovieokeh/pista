export interface iProps {
  dispatch: any;
}

export interface iState {
  email: string;
  password: string;
  emailErrors: string;
  passwordErrors: string;
  shouldRemember: boolean;
  isLoading: boolean;
  [x: string]: any;
}
