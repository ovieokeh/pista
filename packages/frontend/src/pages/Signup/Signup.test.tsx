import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import * as requests from '~requests';
import * as utils from '~utils';
import Signup from '.';
import { iProps, iState } from './interfaces';
import { mockedSignupErrors, mockedSignupSuccess } from './fixtures';

const mockedSignupRequest = jest.spyOn(requests, 'signupRequest');
const mockedPersistData = jest.spyOn(utils, 'persistData');

describe('Signup', () => {
  let wrapper: ReactWrapper<iProps, iState>;
  const dispatch = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Signup dispatch={dispatch} />
      </MemoryRouter>,
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.find('.signup').exists()).toBe(true);
    expect(wrapper.find('#firstName').exists()).toBe(true);
    expect(wrapper.find('#lastName').exists()).toBe(true);
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
  });

  describe('Input actions', () => {
    let instance: Signup;

    beforeEach(() => {
      instance = wrapper.find('Signup').instance() as Signup;
    });

    it('should handle inputChange for typed inputs', () => {
      const firstNameInput = wrapper.find('#firstName').last();
      const lastNameInput = wrapper.find('#lastName').last();
      const emailInput = wrapper.find('#email').last();
      const passwordInput = wrapper.find('#password').last();

      firstNameInput.simulate('change', {
        target: { name: 'firstName', value: 'Buzz' },
      });
      lastNameInput.simulate('change', {
        target: { name: 'lastName', value: 'Lightyear' },
      });
      emailInput.simulate('change', {
        target: { name: 'email', value: 'buzz@lightyear.com' },
      });
      passwordInput.simulate('change', {
        target: { name: 'password', value: 'infinity' },
      });

      expect(instance.state.firstName).toEqual('Buzz');
      expect(instance.state.lastName).toEqual('Lightyear');
      expect(instance.state.email).toEqual('buzz@lightyear.com');
      expect(instance.state.password).toEqual('infinity');
    });

    it('should handle inputFocus', () => {
      instance.setState({
        firstNameErrors: 'an error',
        lastNameErrors: 'an error',
        emailErrors: 'an error',
        passwordErrors: 'an error',
      });

      expect(instance.state.lastNameErrors).toEqual('an error');
      expect(instance.state.firstNameErrors).toEqual('an error');
      expect(instance.state.emailErrors).toEqual('an error');
      expect(instance.state.passwordErrors).toEqual('an error');

      const firstNameInput = wrapper.find('#firstName').last();
      const lastNameInput = wrapper.find('#lastName').last();
      const emailInput = wrapper.find('#email').last();
      const passwordInput = wrapper.find('#password').last();

      firstNameInput.simulate('focus', { name: 'firstName' });
      lastNameInput.simulate('focus', { name: 'lastName' });
      emailInput.simulate('focus', { name: 'email' });
      passwordInput.simulate('focus', { name: 'password' });

      expect(instance.state.lastNameErrors).toEqual('');
      expect(instance.state.firstNameErrors).toEqual('');
      expect(instance.state.emailErrors).toEqual('');
      expect(instance.state.passwordErrors).toEqual('');
    });
  });

  describe('Form actions', () => {
    const preventDefault = jest.fn();
    let instance: Signup;

    beforeEach(() => {
      instance = wrapper.find('Signup').instance() as Signup;
    });

    describe('Form actions', () => {
      const firstNameEvent = {
        target: { name: 'firstName', value: 'Buzz' },
      };
      const lastNameEvent = {
        target: { name: 'lastName', value: 'Lightyear' },
      };
      const emailEvent = {
        target: { name: 'email', value: 'buzz@lightyear.com' },
      };
      const passwordEvent = {
        target: { name: 'password', value: 'infinity' },
      };

      it('should handle an existing email', async () => {
        mockedSignupRequest.mockResolvedValueOnce(mockedSignupErrors);
        const firstNameInput = wrapper.find('#firstName').last();
        const lastNameInput = wrapper.find('#lastName').last();
        const emailInput = wrapper.find('#email').last();
        const passwordInput = wrapper.find('#password').last();

        firstNameInput.simulate('change', firstNameEvent);
        lastNameInput.simulate('change', lastNameEvent);
        emailInput.simulate('change', emailEvent);
        passwordInput.simulate('change', passwordEvent);

        await instance.handleFormSubmission({ preventDefault } as any);

        expect(preventDefault).toBeCalledTimes(1);
        expect(instance.state.emailErrors).toEqual(
          'Email address already in use',
        );
      });

      it('should handle validation errors', async () => {
        mockedSignupErrors.message = 'Validation error';
        mockedSignupRequest.mockResolvedValueOnce(mockedSignupErrors);

        await instance.handleFormSubmission({ preventDefault } as any);

        expect(preventDefault).toBeCalledTimes(2);
        expect(instance.state.firstNameErrors).toEqual(
          mockedSignupErrors.data.firstName.msg,
        );
        expect(instance.state.lastNameErrors).toEqual(
          mockedSignupErrors.data.lastName.msg,
        );
        expect(instance.state.emailErrors).toEqual(
          mockedSignupErrors.data.email.msg,
        );
        expect(instance.state.passwordErrors).toEqual(
          mockedSignupErrors.data.password.msg,
        );
      });

      it('should handle successful signups', async () => {
        mockedSignupRequest.mockResolvedValueOnce(mockedSignupSuccess);
        mockedPersistData.mockImplementationOnce(() => true);

        const firstNameInput = wrapper.find('#firstName').last();
        const lastNameInput = wrapper.find('#lastName').last();
        const emailInput = wrapper.find('#email').last();
        const passwordInput = wrapper.find('#password').last();

        firstNameInput.simulate('change', firstNameEvent);
        lastNameInput.simulate('change', lastNameEvent);
        emailInput.simulate('change', emailEvent);
        passwordInput.simulate('change', passwordEvent);

        await instance.handleFormSubmission({ preventDefault } as any);

        expect(preventDefault).toBeCalledTimes(3);
        expect(mockedPersistData).toBeCalledTimes(1);
        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });
});
