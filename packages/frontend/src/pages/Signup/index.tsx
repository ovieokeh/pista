import * as React from 'react';
import { signupRequest } from '~requests';
import { UserIcon, EmailIcon, LockIcon, FormGroup } from '~components';
import { useFormData } from './customHooks';
import './Signup.scss';
import { SIGNUP_SUCCESS } from '~reducers/types';
import { Link } from 'react-router-dom';

interface iProps {
  dispatch: any;
}

const Signup: React.FunctionComponent<iProps> = props => {
  window.document.title = 'Start tracking - Pista';
  const {
    formData,
    requestErrors,
    handleInputChange,
    handleErrors
  } = useFormData();

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await signupRequest(formData);
    response.status === 'error'
      ? handleErrors(response)
      : props.dispatch({ type: SIGNUP_SUCCESS, data: response });
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
          // required
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
          // required
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
          // required
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
          // required
        />

        <button className="signup__form__submit-btn" type="submit">
          Sign up
        </button>
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
