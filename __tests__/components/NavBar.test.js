import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../../src/components/NavBar';

describe('Test for login component', () => {
  const wrapper = shallow(<NavBar />);
  it('Should contain 1 p element', () => {
    expect(wrapper.find('button').length).toBe(2);
  });
});
