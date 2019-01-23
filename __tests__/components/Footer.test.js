import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../src/components/presentation/Footer';

describe('Test for footer component', () => {
  const wrapper = shallow(<Footer />);
  it('Should contain a particular div block', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
