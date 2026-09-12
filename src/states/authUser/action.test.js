import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {asyncSetAuthUser, asyncUnsetAuthUser, asyncRegisterUser} from './action';
import {setAuthUser, unsetAuthUser} from './reducer';
import {showLoading, hideLoading} from '../loadingBar/reducer';
import * as api from '../../api';

vi.mock('../../api');

/**
 * skenario pengujian authUser thunk
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch showLoading, setAuthUser, and hideLoading actions when login succeeds
 *   - should dispatch showLoading and hideLoading (and not dispatch setAuthUser) when login fails
 * - asyncUnsetAuthUser thunk
 *   - should remove access token and dispatch unsetAuthUser action
 * - asyncRegisterUser thunk
 *   - should return true and call registerApi with correct payload when registration succeeds
 */
describe('authUser thunk', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch setAuthUser between showLoading and hideLoading on success',
        async () => {
          const fakeToken = 'fake-token-123';
          const fakeUser = {id: 'user-1', name: 'Marliana'};
          api.login.mockResolvedValue(fakeToken);
          api.putAccessToken.mockImplementation(() => {});
          api.getOwnProfile.mockResolvedValue(fakeUser);

          const dispatch = vi.fn();
          await asyncSetAuthUser({email: 'marliana@mail.com', password: 'rahasia'})(dispatch);

          expect(api.login).toHaveBeenCalledWith({email: 'marliana@mail.com', password: 'rahasia'});
          expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
          expect(dispatch).toHaveBeenCalledWith(showLoading());
          expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUser));
          expect(dispatch).toHaveBeenCalledWith(hideLoading());
        });

    it('should not dispatch setAuthUser and should alert when login fails',
        async () => {
          api.login.mockRejectedValue({response: {data: {message: 'Email tidak ditemukan'}}});

          const dispatch = vi.fn();
          await asyncSetAuthUser({email: 'salah@mail.com', password: 'salah'})(dispatch);

          expect(dispatch).toHaveBeenCalledWith(showLoading());
          expect(dispatch).not.toHaveBeenCalledWith(
              expect.objectContaining({type: 'authUser/setAuthUser'}),
          );
          expect(dispatch).toHaveBeenCalledWith(hideLoading());
          expect(window.alert).toHaveBeenCalledWith('Email tidak ditemukan');
        });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('should remove access token and dispatch unsetAuthUser action', () => {
      api.removeAccessToken.mockImplementation(() => {});
      const dispatch = vi.fn();

      asyncUnsetAuthUser()(dispatch);

      expect(api.removeAccessToken).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUser());
    });
  });

  describe('asyncRegisterUser thunk', () => {
    it('should call register API and return true when registration succeeds',
        async () => {
          api.register.mockResolvedValue();

          const dispatch = vi.fn();
          const payload = {name: 'Marliana', email: 'marliana@mail.com', password: 'rahasia'};
          const result = await asyncRegisterUser(payload)(dispatch);

          expect(api.register).toHaveBeenCalledWith(payload);
          expect(result).toBe(true);
          expect(dispatch).toHaveBeenCalledWith(showLoading());
          expect(dispatch).toHaveBeenCalledWith(hideLoading());
        });
  });
});
