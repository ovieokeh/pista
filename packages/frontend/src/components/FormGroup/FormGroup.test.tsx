import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormGroup, iProps } from '.';

describe('FormGroup', () => {
  let wrapper: ShallowWrapper;
  const props: iProps = {
    id: 'testID',
    name: 'Test',
    labelIcon: 'icon',
    inputType: 'text',
    value: '',
    placeHolder: 'test placeholder',
    autoComplete: 'test',
    onChange: jest.fn(),
    error: '',
    required: false,
    success: false,
  };

  beforeEach(() => {
    wrapper = shallow(<FormGroup {...props} />);
  });

  it('should render correctly', () => {
    const formGroup = wrapper.find('.form-group');
    expect(formGroup.exists()).toBe(true);
    expect(formGroup.find('label').text()).toEqual('icon');
    expect(formGroup.find('input').exists()).toBe(true);
  });

  it('should handle onChange events', () => {
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'something' } });
    expect(props.onChange).toBeCalledTimes(1);
  });

  it('should render errors', () => {
    wrapper.setProps({ error: 'cannot find brain' });
    const errorDiv = wrapper.find('.form-group__error');
    expect(errorDiv.exists()).toBe(true);
    expect(errorDiv.text()).toEqual('cannot find brain');
  });
});
