import * as React from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon, LockIcon, Checkbox, Button, FormGroup } from '~components';
import { persistData, toggleButtonLoader } from '~utils';
import { loginRequest } from '~requests';
import { LOGIN_SUCCESS } from '~reducers/types';
import { useFormData } from './customHooks';
import './Login.scss';

interface iProps {
  dispatch: any;
}

const Login: React.FunctionComponent<iProps> = props => {
  window.document.title = 'Login to your account - Pista';
  const submitBtn = React.useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    formData,
    requestErrors,
    handleInputChange,
    handleCheckbox,
    handleErrors
  } = useFormData();

  const toggleLoadingState = () => {
    setIsLoading(!isLoading);
  };

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    toggleButtonLoader(submitBtn, true, toggleLoadingState);

    const response = await loginRequest(formData);
    if (response.status === 'error') {
      handleErrors(response);
      toggleButtonLoader(submitBtn, false, setIsLoading);
      return;
    }

    formData.shouldRemember &&
      persistData('auth', {
        user: response.user,
        token: response.token
      });

    props.dispatch({ type: LOGIN_SUCCESS, data: response });
  };

  return (
    <div className="login">
      <form
        data-aos="slide-down"
        data-aos-duration="300"
        className="login__form"
        onSubmit={handleFormSubmission}
      >
        <h2 className="login__form__header">Welcome back</h2>

        <FormGroup
          id="email"
          name="email"
          inputType="email"
          value={formData.email}
          onChange={handleInputChange}
          placeHolder="Email"
          labelIcon={<EmailIcon />}
          autoComplete="email"
          error={requestErrors.email}
          required
        />

        <FormGroup
          id="password"
          name="password"
          inputType="password"
          value={formData.password}
          onChange={handleInputChange}
          placeHolder="Password"
          labelIcon={<LockIcon />}
          autoComplete="new-password"
          error={requestErrors.password}
          required
        />

        <Checkbox
          id="remember"
          label="Remember me"
          checked={formData.shouldRemember}
          onChange={handleCheckbox}
        />

        <Button
          ref={submitBtn}
          text="Login"
          type="submit"
          isLoading={isLoading}
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
};

export default Login;
