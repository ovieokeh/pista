export const mockedSignupErrors = {
  status: 'error',
  message: 'Email address already in use',
  data: {
    firstName: { msg: 'firstName field cannot be empty' },
    lastName: { msg: 'lastName field cannot be empty' },
    email: { msg: 'email field cannot be empty' },
    password: { msg: 'password field cannot be empty' },
  },
};

export const mockedSignupSuccess = {
  status: 'success',
  message: 'Login successful',
  user: 'user',
  token: 'token',
};
