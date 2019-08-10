export interface iProps {
  dispatch: any;
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
  [x: string]: any;
}
