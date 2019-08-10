import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Checkbox } from '.';

describe('Checkbox', () => {
  let wrapper: ShallowWrapper;
  const checkBoxProps = {
    id: 'checker',
    label: 'Test Me',
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Checkbox {...checkBoxProps} />);
  });

  it('should render correctly', () => {
    const formGroup = wrapper.find('.form-group');
    expect(formGroup.exists()).toBe(true);
    expect(formGroup.find('input').exists()).toBe(true);
    expect(formGroup.find('label').text()).toEqual('Test Me');
  });

  it('should handle onChange events', () => {
    const input = wrapper.find('input');
    input.simulate('change', { target: { checked: true } });
    expect(checkBoxProps.onChange).toBeCalledTimes(1);
  });
});
