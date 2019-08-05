import * as React from 'react';
import { Link } from 'react-router-dom';
import { signupRequest } from '~requests';
import { UserIcon, EmailIcon, LockIcon, Button, FormGroup } from '~components';
import { SIGNUP_SUCCESS } from '~reducers/types';
import { persistData, toggleButtonLoader } from '~utils';
import { useFormData } from './customHooks';
import './Signup.scss';

interface iProps {
  dispatch: any;
}

const Signup: React.FunctionComponent<iProps> = props => {
  window.document.title = 'Start tracking - Pista';
  const submitBtn = React.useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    formData,
    requestErrors,
    handleInputChange,
    handleErrors
  } = useFormData();

  const toggleLoadingState = () => {
    setIsLoading(!isLoading);
  };

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    toggleButtonLoader(submitBtn, true, toggleLoadingState);

    const response = await signupRequest(formData);
    if (response.status === 'error') {
      handleErrors(response);
      toggleButtonLoader(submitBtn, false, setIsLoading);
      return;
    }

    persistData('auth', {
      user: response.user,
      token: response.token
    });

    props.dispatch({ type: SIGNUP_SUCCESS, data: response });
  };

  return (
    <div className="signup">
      <form
        data-aos="slide-down"
        data-aos-duration="300"
        className="signup__form"
        onSubmit={handleFormSubmission}
      >
        <h2 className="signup__form__header">Welcome to Pista</h2>
        <p className="signup__form__intro">
          Please create an account to get started
        </p>

        <FormGroup
          id="firstName"
          name="firstName"
          inputType="text"
          value={formData.firstName}
          onChange={handleInputChange}
          placeHolder="First Name"
          labelIcon={<UserIcon />}
          autoComplete="first-name"
          error={requestErrors.firstName}
          required
        />

        <FormGroup
          id="lastName"
          name="lastName"
          inputType="text"
          value={formData.lastName}
          onChange={handleInputChange}
          placeHolder="Last Name"
          labelIcon={<UserIcon />}
          autoComplete="last-name"
          error={requestErrors.lastName}
          required
        />

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

        <Button
          ref={submitBtn}
          text="Sign up"
          type="submit"
          isLoading={isLoading}
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
};

export default Signup;