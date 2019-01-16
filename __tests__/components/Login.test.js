import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/components/authentication/Login';

const props = {
  message: '',
  isSuccessful: '',
};
describe('Test for login component', () => {
  it('Should contain', () => {
    // jest.spyOn(Login.prototype, 'onFormSubmit').mockImplementation(() => undefined);
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
