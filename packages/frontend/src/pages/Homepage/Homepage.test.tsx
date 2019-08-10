import * as React from 'react';
import { shallow } from 'enzyme';
import Homepage from '.';

describe('Homepage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.find('.homepage').exists()).toBe(true);
  });
});
