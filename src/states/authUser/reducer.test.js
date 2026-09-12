import {describe, it, expect} from 'vitest';
import authUserReducer, {setAuthUser, unsetAuthUser} from './reducer';

/**
 * skenario pengujian authUserReducer
 *
 * - authUserReducer
 *   - should return the initial state (null) when given by unknown action
 *   - should return the user data when given by setAuthUser action
 *   - should return null when given by unsetAuthUser action
 */
describe('authUserReducer', () => {
  it('should return the initial state (null) when given by unknown action', () => {
    const initialState = null;
    const action = {type: 'UNKNOWN'};

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the user data when given by setAuthUser action', () => {
    const initialState = null;
    const user = {id: 'user-1', name: 'Marliana', email: 'marliana@mail.com'};
    const action = setAuthUser(user);

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(user);
  });

  it('should return null when given by unsetAuthUser action', () => {
    const initialState = {id: 'user-1', name: 'Marliana', email: 'marliana@mail.com'};
    const action = unsetAuthUser();

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
