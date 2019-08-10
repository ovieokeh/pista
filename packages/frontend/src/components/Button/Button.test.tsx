import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button, iProps } from '.';

describe('Button', () => {
  let wrapper: ShallowWrapper;
  const buttonProps: iProps = {
    type: 'button',
    text: 'Test Me',
    isLoading: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Button {...buttonProps} />);
  });

  it('should render correctly', () => {
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').text()).toEqual('Test Me');
  });

  it('should handle clicks correctly', () => {
    const button = wrapper.find('button');
    button.simulate('click', 'clicked');
    expect(buttonProps.onClick).toHaveBeenCalledWith('clicked');
  });

  it('renders loader when isLoading is true', () => {
    wrapper.setProps({ isLoading: true, extraClasses: 'tested' });
    expect(wrapper.find('Loader').exists()).toBe(true);
    expect(wrapper.find('.tested').exists()).toBe(true);
  });
});
