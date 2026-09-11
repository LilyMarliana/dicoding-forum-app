import {getLeaderboards} from '../../api';
import {receiveUsers} from './reducer';
import {showLoading, hideLoading} from '../loadingBar/reducer';

function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await getLeaderboards();
      dispatch(receiveUsers(leaderboards));
    } catch (error) {
      alert(error?.response?.data?.message || 'Gagal memuat leaderboard');
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {asyncPopulateLeaderboards};
