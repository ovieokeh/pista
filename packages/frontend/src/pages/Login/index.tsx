import * as React from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon, LockIcon, Checkbox, Button, FormGroup } from '~components';
import { persistData } from '~utils';
import { loginRequest } from '~requests';
import { LOGIN_SUCCESS } from '~reducers/types';
import { iProps, iState } from './interfaces';
import './Login.scss';

class Login extends React.PureComponent<iProps, iState> {
  submitBtn: React.RefObject<HTMLButtonElement>;

  constructor(props: iProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailErrors: '',
      passwordErrors: '',
      shouldRemember: false,
      isLoading: false,
      success: false,
    };

    this.submitBtn = React.createRef<HTMLButtonElement>();
    window.document.title = 'Log into your account - Pista';
  }

  handleInputFocus = (event: React.FocusEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      [`${target.name}Errors`]: '',
    });
  };

  handleInputChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;

    target.id === 'remember'
      ? this.setState(prevState => ({
          shouldRemember: !prevState.shouldRemember,
        }))
      : this.setState({
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

    const response = await loginRequest({
      email: this.state.email,
      password: this.state.password,
    });

    if (response.status === 'error') {
      this.handleFormErrors(response);
      this.toggleSubmitButton(false);
      this.setState({ isLoading: false });
      return;
    }

    this.state.shouldRemember &&
      persistData('auth', {
        user: response.user,
        token: response.token,
      });

    this.setState({ success: true, isLoading: false });
    setTimeout(() => {
      this.props.dispatch({ type: LOGIN_SUCCESS, data: response });
      !response.user.hasPendingBudget && this.props.history.push('/setup');
    }, 1000);
  };

  handleFormErrors = (response: any) => {
    if (response.message === 'Invalid login credentials') {
      this.setState({
        emailErrors: response.message,
        passwordErrors: response.message,
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
      <div className="login">
        <form
          data-aos="slide-down"
          data-aos-duration="300"
          className="login__form"
          onSubmit={this.handleFormSubmission}
        >
          <h2 className="login__form__header">Welcome back</h2>

          <FormGroup
            id="email"
            name="email"
            inputType="email"
            value={this.state.email}
            success={this.state.success}
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
            success={this.state.success}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            placeHolder="Password"
            labelIcon={<LockIcon />}
            autoComplete="current-password"
            error={this.state.passwordErrors}
            required
          />

          <Checkbox
            id="remember"
            label="Remember me"
            checked={this.state.shouldRemember}
            onChange={this.handleInputChange}
          />

          <Button
            ref={this.submitBtn}
            text="Login"
            type="submit"
            isLoading={this.state.isLoading}
          />
        </form>
        <div
          data-aos="slide-up"
          data-aos-duration="500"
          className="login__signup-cta"
        >
          <span className="login__signup-cta__content">
            New here? <Link to="/signup">Signup</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
