export const mockedLoginErrors = {
  status: 'error',
  message: 'Invalid login credentials',
  data: {
    email: { msg: 'email field cannot be empty' },
    password: { msg: 'password field cannot be empty' },
  },
};

export const mockedLoginSuccess = {
  status: 'success',
  message: 'Login successful',
  user: 'user',
  token: 'token',
};
