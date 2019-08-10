import * as React from 'react';
import { shallow } from 'enzyme';
import * as icons from '.';

describe('Icons', () => {
  it('should renders the UserIcon correctly', () => {
    const { UserIcon } = icons;
    const wrapper = shallow(<UserIcon />);
    expect(wrapper.filter('svg').exists()).toBe(true);
  });

  it('should renders the EmailIcon correctly', () => {
    const { EmailIcon } = icons;
    const wrapper = shallow(<EmailIcon />);
    expect(wrapper.filter('svg').exists()).toBe(true);
  });

  it('should renders the LockIcon correctly', () => {
    const { LockIcon } = icons;
    const wrapper = shallow(<LockIcon />);
    expect(wrapper.filter('svg').exists()).toBe(true);
  });

  it('should renders the DashboardIcon correctly', () => {
    const { DashboardIcon } = icons;
    const wrapper = shallow(<DashboardIcon />);
    expect(wrapper.filter('svg').exists()).toBe(true);
  });

  it('should renders the PoundIcon correctly', () => {
    const { PoundIcon } = icons;
    const wrapper = shallow(<PoundIcon />);
    expect(wrapper.filter('svg').exists()).toBe(true);
  });

  it('should renders the NairaIcon correctly', () => {
    const { NairaIcon } = icons;
    const wrapper = shallow(<NairaIcon />);
    expect(wrapper.filter('svg').exists()).toBe(true);
  });
});
