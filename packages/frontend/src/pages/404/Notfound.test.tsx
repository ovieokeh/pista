import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Notfound } from '.';

describe('Notfound', () => {
  let wrapper: ShallowWrapper;
  const history = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Notfound history={history as any} />);
  });

  it('should render correctly', () => {
    const component = wrapper.find('.notfound');
    expect(component.exists()).toBe(true);
    expect(component.find('.notfound__image').exists()).toBe(true);
  });

  it('should handle back link clicks', () => {
    const button = wrapper.find('button');
    expect(button.text()).toEqual('Go back');

    button.simulate('click');
    expect(history.goBack).toHaveBeenCalled();
  });
});
