import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import * as requests from '~requests';
import * as utils from '~utils';
import Login from '.';
import { iProps, iState } from './interfaces';
import { mockedLoginErrors, mockedLoginSuccess } from './fixtures';

const mockedLoginRequest = jest.spyOn(requests, 'loginRequest');
const mockedPersistData = jest.spyOn(utils, 'persistData');

describe('Login', () => {
  let wrapper: ReactWrapper<iProps, iState>;
  const dispatch = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Login dispatch={dispatch} />
      </MemoryRouter>,
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.find('.login').exists()).toBe(true);
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
    expect(wrapper.find('#remember').exists()).toBe(true);
  });

  describe('Input actions', () => {
    let instance: Login;

    beforeEach(() => {
      instance = wrapper.find('Login').instance() as Login;
    });

    it('should handle inputChange for typed inputs', () => {
      const emailInput = wrapper.find('#email').last();
      const passwordInput = wrapper.find('#password').last();

      emailInput.simulate('change', {
        target: { name: 'email', value: 'buzz@lightyear.com' },
      });
      passwordInput.simulate('change', {
        target: { name: 'password', value: 'infinity' },
      });

      expect(instance.state.email).toEqual('buzz@lightyear.com');
      expect(instance.state.password).toEqual('infinity');
    });

    it('should handle inputChange for checkbox', () => {
      const checkbox = wrapper.find('#remember').last();
      checkbox.simulate('change', {
        target: { id: 'remember', checked: true },
      });

      expect(instance.state.shouldRemember).toEqual(true);
    });

    it('should handle inputFocus', () => {
      instance.setState({
        emailErrors: 'an error',
        passwordErrors: 'an error',
      });

      expect(instance.state.emailErrors).toEqual('an error');
      expect(instance.state.passwordErrors).toEqual('an error');

      const emailInput = wrapper.find('#email').last();
      const passwordInput = wrapper.find('#password').last();

      emailInput.simulate('focus', { name: 'email' });
      passwordInput.simulate('focus', { name: 'password' });

      expect(instance.state.emailErrors).toEqual('');
      expect(instance.state.passwordErrors).toEqual('');
    });
  });

  describe('Form actions', () => {
    const preventDefault = jest.fn();
    let instance: Login;

    beforeEach(() => {
      instance = wrapper.find('Login').instance() as Login;
    });

    describe('Form actions', () => {
      const emailEvent = {
        target: { name: 'email', value: 'buzz@lightyear.com' },
      };
      const passwordEvent = {
        target: { name: 'password', value: 'infinity' },
      };

      it('should handle invalid credentials', async () => {
        mockedLoginRequest.mockResolvedValueOnce(mockedLoginErrors);
        const emailInput = wrapper.find('#email').last();
        const passwordInput = wrapper.find('#password').last();

        emailInput.simulate('change', emailEvent);
        passwordInput.simulate('change', passwordEvent);

        await instance.handleFormSubmission({ preventDefault } as any);

        expect(preventDefault).toBeCalledTimes(1);
        expect(instance.state.emailErrors).toEqual('Invalid login credentials');
        expect(instance.state.passwordErrors).toEqual(
          'Invalid login credentials',
        );
      });

      it('should handle validation errors', async () => {
        mockedLoginErrors.message = 'Validation error';
        mockedLoginRequest.mockResolvedValueOnce(mockedLoginErrors);

        const emailInput = wrapper.find('#email').last();
        const passwordInput = wrapper.find('#password').last();

        emailInput.simulate('change', emailEvent);
        passwordInput.simulate('change', passwordEvent);

        await instance.handleFormSubmission({ preventDefault } as any);

        expect(preventDefault).toBeCalledTimes(2);
        expect(instance.state.emailErrors).toEqual(
          mockedLoginErrors.data.email.msg,
        );
        expect(instance.state.passwordErrors).toEqual(
          mockedLoginErrors.data.password.msg,
        );
      });

      it('should handle successful logins', async () => {
        mockedLoginRequest.mockResolvedValueOnce(mockedLoginSuccess);
        mockedPersistData.mockImplementationOnce(() => true);

        const emailInput = wrapper.find('#email').last();
        const passwordInput = wrapper.find('#password').last();
        const remember = wrapper.find('#remember').last();

        emailInput.simulate('change', emailEvent);
        passwordInput.simulate('change', passwordEvent);
        remember.simulate('change', {
          target: { id: 'remember', checked: true },
        });

        await instance.handleFormSubmission({ preventDefault } as any);

        expect(preventDefault).toBeCalledTimes(3);
        expect(mockedPersistData).toBeCalledTimes(1);
        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });
});
