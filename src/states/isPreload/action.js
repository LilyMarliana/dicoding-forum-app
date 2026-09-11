import {getAccessToken, getOwnProfile} from '../../api';
import {setAuthUser, unsetAuthUser} from '../authUser/reducer';
import {setPreloadDone} from './reducer';

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        const user = await getOwnProfile();
        dispatch(setAuthUser(user));
      } else {
        dispatch(unsetAuthUser());
      }
    } catch {
      dispatch(unsetAuthUser());
    } finally {
      dispatch(setPreloadDone());
    }
  };
}

export {asyncPreloadProcess};
