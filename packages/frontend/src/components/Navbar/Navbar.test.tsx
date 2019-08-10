import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Navbar } from '.';

describe('Navbar', () => {
  let wrapper: ShallowWrapper;
  const props = {
    auth: {
      token: '',
      user: null,
    },
    dispatch: jest.fn(),
  };

  const dummyUser = {
    firstName: 'Buzz',
    lastName: 'Lightyear',
    avatarUrl: 'img',
    email: 'buzz@lightyear.com',
  };

  beforeEach(() => {
    wrapper = shallow(<Navbar {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper.find('.navbar').exists()).toBe(true);
    expect(wrapper.find('Link').length).toBe(3);
  });

  it('should render the dropdown when a user is logged in', () => {
    wrapper.setProps({ auth: { token: 'token', user: dummyUser } });

    const dropdown = wrapper.find('.navbar__dropdown');
    expect(dropdown.exists()).toBe(true);
    expect(
      dropdown
        .find('p')
        .first()
        .text(),
    ).toEqual('Buzz Lightyear');

    expect(
      dropdown
        .find('p')
        .at(1)
        .text(),
    ).toEqual(dummyUser.email);
  });

  it('should call dispatch on logout', () => {
    delete dummyUser.avatarUrl;
    wrapper.setProps({ auth: { token: 'token', user: dummyUser } });

    const logoutDiv = wrapper.find('.navbar__dropdown__links__link').last();
    logoutDiv.simulate('click');
    expect(props.dispatch).toHaveBeenCalledWith({ type: 'logout' });
  });
});
