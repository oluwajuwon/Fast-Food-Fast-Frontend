import MockAdapter from 'axios-mock-adapter';
import login from '../../src/reducers/loginReducer';
import axiosInstance from '../../src/api/axiosInstance';

describe('login reducer', () => {
  it('is correct', () => {
    const action = { type: 'dummy_action' };
    const initialState = null;
    expect(login(null, action)).toEqual(initialState);
  });

  it('returns the correct state', async () => {
    const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
    const payload = { success: 'true', message: 'login successful' };
    await axiosMock.onPost().reply(200, payload);
    const action = { type: 'LOG_IN', payload };
    const expectedState = { success: 'true', message: 'login successful' };

    expect(login(null, action)).toEqual(expectedState);
  });

  it('returns the correct state', async () => {
    const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
    const payload = { success: 'false', message: 'please enter valid credentials' };
    await axiosMock.onPost().reply(400, payload);
    const action = { type: 'LOG_IN_FAIL', payload };
    const expectedState = { success: 'false', message: 'please enter valid credentials' };

    expect(login(null, action)).toEqual(expectedState);
  });
});
