import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import * as requests from '~requests';
import Setup from '.';
import { iProps } from './interfaces';

jest.useFakeTimers();
const mockedBudgetRequest = jest.spyOn(requests, 'newBudgetRequest');
const mockedBudgetErrors = {
  status: 'error',
  message: 'you already have a pending budget',
  data: {
    amount: { msg: 'amount must be more than 9999' },
    startDate: { msg: 'end date sucks' },
    endDate: { msg: 'same as last date' },
  },
};

describe('Setup', () => {
  let wrapper: ReactWrapper;
  const props: iProps = {
    history: { push: jest.fn() } as any,
    dispatch: jest.fn(),
    auth: {
      user: {
        avatarUrl: null,
        createdAt: '2019-08-12T21:32:56.746Z',
        email: 'pump@kicks.com',
        firstName: 'Pump',
        hasPendingBudget: false,
        id: 'eb005645-0696-495e-93a5-750ba484e79b',
        lastName: 'Kicks',
      },
      token: 'sometoken',
    },
  };

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Setup {...props} />
      </MemoryRouter>,
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.find('.setup').exists()).toBe(true);
  });

  it('should redirect to dashboard when user has a pending budget', () => {
    mount(
      <MemoryRouter>
        <Setup {...props} auth={{ user: { hasPendingBudget: true } }} />
      </MemoryRouter>,
    );
    expect(props.history.push).toHaveBeenCalledWith('/dashboard');
  });

  describe('Input actions', () => {
    let instance: Setup;

    beforeEach(() => {
      instance = wrapper.find('Setup').instance() as Setup;
    });

    it('should handle inputChange for typed inputs', () => {
      const amountInput = wrapper.find('#amount').last();

      amountInput.simulate('change', {
        target: { name: 'amount', value: '11000' },
      });

      expect(instance.state.amount).toEqual('11000');
    });

    it('should handle date selection', () => {
      const instance = wrapper.find('Setup').instance() as Setup;
      const handleDateChangeSpy = jest.spyOn(instance, 'handleDateChange');

      const dateSelector = wrapper.find('DatePicker').first();
      dateSelector.find('input').simulate('click');

      const day = wrapper.find('Day').first();
      day.simulate('click');

      expect(handleDateChangeSpy).toHaveBeenCalledWith('endDate');
    });
  });

  describe('Form actions', () => {
    const preventDefault = jest.fn();
    let instance: Setup;

    beforeEach(() => {
      instance = wrapper.find('Setup').instance() as Setup;
    });

    it('should handle a successful budget setup', async () => {
      mockedBudgetRequest.mockResolvedValueOnce({
        status: 'success',
      });

      await instance.handleFormSubmit({ preventDefault } as any);
      jest.runAllTimers();

      expect(preventDefault).toBeCalledTimes(1);
      expect(instance.state.success).toBe(true);
      expect(instance.state.isLoading).toBe(false);
      expect(props.history.push).toHaveBeenCalledWith('/dashboard');
    });

    it('should handle duplicate budgets', async () => {
      mockedBudgetRequest.mockResolvedValueOnce(mockedBudgetErrors);

      await instance.handleFormSubmit({ preventDefault } as any);

      expect(instance.state.amountErrors).toEqual(mockedBudgetErrors.message);
      expect(instance.state.startDateErrors).toEqual(
        mockedBudgetErrors.message,
      );
      expect(instance.state.endDateErrors).toEqual(mockedBudgetErrors.message);
    });

    it('should handle other errors', async () => {
      mockedBudgetErrors.message = 'something went wrong';
      mockedBudgetRequest.mockResolvedValueOnce(mockedBudgetErrors);

      await instance.handleFormSubmit({ preventDefault } as any);

      expect(instance.state.amountErrors).toEqual(
        mockedBudgetErrors.data.amount.msg,
      );
      expect(instance.state.startDateErrors).toEqual(
        mockedBudgetErrors.data.startDate.msg,
      );
      expect(instance.state.endDateErrors).toEqual(
        mockedBudgetErrors.data.endDate.msg,
      );
    });
  });

  //     it('should handle invalid credentials', async () => {
  //       mockedLoginRequest.mockResolvedValueOnce(mockedLoginErrors);
  //       const emailInput = wrapper.find('#email').last();
  //       const passwordInput = wrapper.find('#password').last();

  //       emailInput.simulate('change', emailEvent);
  //       passwordInput.simulate('change', passwordEvent);

  //       await instance.handleFormSubmission({ preventDefault } as any);

  //       expect(preventDefault).toBeCalledTimes(1);
  //       expect(instance.state.emailErrors).toEqual('Invalid login credentials');
  //       expect(instance.state.passwordErrors).toEqual(
  //         'Invalid login credentials',
  //       );
  //     });

  //     it('should handle validation errors', async () => {
  //       mockedLoginErrors.message = 'Validation error';
  //       mockedLoginRequest.mockResolvedValueOnce(mockedLoginErrors);

  //       const emailInput = wrapper.find('#email').last();
  //       const passwordInput = wrapper.find('#password').last();

  //       emailInput.simulate('change', emailEvent);
  //       passwordInput.simulate('change', passwordEvent);

  //       await instance.handleFormSubmission({ preventDefault } as any);

  //       expect(preventDefault).toBeCalledTimes(2);
  //       expect(instance.state.emailErrors).toEqual(
  //         mockedLoginErrors.data.email.msg,
  //       );
  //       expect(instance.state.passwordErrors).toEqual(
  //         mockedLoginErrors.data.password.msg,
  //       );
  //     });

  //     it('should handle successful logins', async () => {
  //       mockedLoginRequest.mockResolvedValueOnce(mockedLoginSuccess);
  //       mockedPersistData.mockImplementationOnce(() => true);

  //       const emailInput = wrapper.find('#email').last();
  //       const passwordInput = wrapper.find('#password').last();
  //       const remember = wrapper.find('#remember').last();

  //       emailInput.simulate('change', emailEvent);
  //       passwordInput.simulate('change', passwordEvent);
  //       remember.simulate('change', {
  //         target: { id: 'remember', checked: true },
  //       });

  //       await instance.handleFormSubmission({ preventDefault } as any);
  //       jest.runAllTimers();
  //       expect(preventDefault).toBeCalledTimes(3);
  //       expect(mockedPersistData).toBeCalledTimes(1);
  //       expect(dispatch).toBeCalledTimes(1);
  //     });
  //   });
  // });
});
