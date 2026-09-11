import {
  login as loginApi,
  register as registerApi,
  getOwnProfile,
  putAccessToken,
  removeAccessToken,
} from '../../api';
import {setAuthUser, unsetAuthUser} from './reducer';
import {showLoading, hideLoading} from '../loadingBar/reducer';

function asyncSetAuthUser({email, password}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await loginApi({email, password});
      putAccessToken(token);
      const user = await getOwnProfile();
      dispatch(setAuthUser(user));
    } catch (error) {
      alert(error?.response?.data?.message || 'Login gagal');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    removeAccessToken();
    dispatch(unsetAuthUser());
  };
}

function asyncRegisterUser({name, email, password}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await registerApi({name, email, password});
      return true;
    } catch (error) {
      alert(error?.response?.data?.message || 'Registrasi gagal');
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {asyncSetAuthUser, asyncUnsetAuthUser, asyncRegisterUser};
