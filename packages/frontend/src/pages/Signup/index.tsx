import * as React from 'react';
import { Link } from 'react-router-dom';
import { signupRequest } from '~requests';
import { UserIcon, EmailIcon, LockIcon, Button, FormGroup } from '~components';
import { SIGNUP_SUCCESS } from '~reducers/types';
import { persistData } from '~utils';
import { iProps, iState } from './interfaces';
import './Signup.scss';

class Signup extends React.PureComponent<iProps, iState> {
  submitBtn: React.RefObject<HTMLButtonElement>;

  constructor(props: iProps) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      firstNameErrors: '',
      lastNameErrors: '',
      emailErrors: '',
      passwordErrors: '',
      isLoading: false,
    };

    this.submitBtn = React.createRef<HTMLButtonElement>();
  }

  handleInputFocus = (event: React.FocusEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      [`${target.name}Errors`]: '',
    });
  };

  handleInputChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;

    this.setState({
      [target.name]: target.value,
      emailErrors: '',
      passwordErrors: '',
    });
  };

  toggleSubmitButton = (state: boolean) => {
    if (this.submitBtn && this.submitBtn.current) {
      this.submitBtn.current.disabled = state;
    }
  };

  handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();

    this.setState({ isLoading: true });
    this.toggleSubmitButton(true);

    const response = await signupRequest({ ...this.state });

    if (response.status === 'error') {
      this.handleFormErrors(response);
      this.toggleSubmitButton(false);
      this.setState({ isLoading: false });
      return;
    }

    persistData('auth', {
      user: response.user,
      token: response.token,
    });

    this.props.dispatch({ type: SIGNUP_SUCCESS, data: response });
  };

  handleFormErrors = (response: any) => {
    if (response.message === 'Email address already in use') {
      this.setState({
        emailErrors: response.message,
      });
      return;
    }

    const { data } = response;

    for (const err in data) {
      this.setState({
        [`${err}Errors`]: data[err].msg,
      });
    }
  };

  render() {
    return (
      <div className="signup">
        <form
          data-aos="slide-down"
          data-aos-duration="300"
          className="signup__form"
          onSubmit={this.handleFormSubmission}
        >
          <h2 className="signup__form__header">Welcome to Pista</h2>
          <p className="signup__form__intro">
            Please create an account to get started
          </p>

          <FormGroup
            id="firstName"
            name="firstName"
            inputType="text"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            placeHolder="First Name"
            labelIcon={<UserIcon />}
            autoComplete="first-name"
            error={this.state.firstNameErrors}
            required
          />

          <FormGroup
            id="lastName"
            name="lastName"
            inputType="text"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            placeHolder="Last Name"
            labelIcon={<UserIcon />}
            autoComplete="last-name"
            error={this.state.lastNameErrors}
            required
          />

          <FormGroup
            id="email"
            name="email"
            inputType="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            placeHolder="Email"
            labelIcon={<EmailIcon />}
            autoComplete="email"
            error={this.state.emailErrors}
            required
          />

          <FormGroup
            id="password"
            name="password"
            inputType="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            placeHolder="Password"
            labelIcon={<LockIcon />}
            autoComplete="new-password"
            error={this.state.passwordErrors}
            required
          />

          <Button
            ref={this.submitBtn}
            text="Sign up"
            type="submit"
            isLoading={this.state.isLoading}
          />
        </form>
        <div
          data-aos="slide-up"
          data-aos-duration="500"
          className="signup__login-cta"
        >
          <span className="signup__login-cta__content">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Signup;
