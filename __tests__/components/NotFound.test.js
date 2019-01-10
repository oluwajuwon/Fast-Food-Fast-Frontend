import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../src/components/NotFound';

describe('Test for index component', () => {
  const wrapper = shallow(<NotFound />);
  it('Should contain 1 p element', () => {
    expect(wrapper.find('h1').length).toBe(1);
  });
});
