import * as React from 'react';
import { shallow } from 'enzyme';
import Setup from '.';

describe('Setup', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Setup />);
    expect(wrapper.find('.setup').exists()).toBe(true);
  });
});
