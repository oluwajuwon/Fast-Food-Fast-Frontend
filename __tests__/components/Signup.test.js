import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../src/components/authentication/Signup';

const props = {
  message: '',
  isSuccessful: '',
};
describe('Test for login component', () => {
  it('Should contain', () => {
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
