import selectFood from '../../src/reducers/selectFoodReducer';

describe('select food reducer', () => {
  it('is correct', () => {
    const action = { type: 'dummy_action' };
    const state = { cartCount: 0 };
    const initialState = { cartCount: 0 };
    expect(selectFood(state, action)).toEqual(initialState);
  });

  it('returns the correct state', async () => {
    const action = { type: 'SELECT_MENU' };
    const state = { cartCount: 0 };
    const expectedState = { cartCount: state.cartCount + 1 };
    expect(selectFood(state, action)).toEqual(expectedState);
  });
});
