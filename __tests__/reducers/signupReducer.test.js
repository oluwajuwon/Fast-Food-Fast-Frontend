import MockAdapter from 'axios-mock-adapter';
import signup from '../../src/reducers/authReducer';
import axiosInstance from '../../src/api/axiosInstance';

describe('signup reducer', () => {
  it('is correct', () => {
    const action = { type: 'dummy_action' };
    const initialState = null;
    expect(signup(null, action)).toEqual(initialState);
  });

  it('returns the correct state', async () => {
    const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
    const payload = { success: 'true', message: 'Sign up successful' };
    await axiosMock.onPost().reply(200, payload);
    const action = { type: 'SIGN_UP', payload };
    const expectedState = { isLoggedin: true, response: { success: 'true', message: 'Sign up successful' } };

    expect(signup(null, action)).toEqual(expectedState);
  });

  it('returns the correct state', async () => {
    const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
    const payload = { success: 'false', message: 'Please enter a valid email address' };
    await axiosMock.onPost().reply(400, payload);
    const action = { type: 'SIGNUP_FAIL', payload };
    const expectedState = { isLoggedin: false, response: { success: 'false', message: 'Please enter a valid email address' } };

    expect(signup(null, action)).toEqual(expectedState);
  });
});
