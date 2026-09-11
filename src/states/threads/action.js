import {
  getAllThreads,
  getAllUsers,
  createThread as createThreadApi,
  upVoteThread as upVoteThreadApi,
  downVoteThread as downVoteThreadApi,
  neutralVoteThread as neutralVoteThreadApi,
} from '../../api';
import {receiveThreads, addThread, updateThreadVote} from './reducer';
import {showLoading, hideLoading} from '../loadingBar/reducer';

function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [threads, users] = await Promise.all([getAllThreads(), getAllUsers()]);

      const threadsWithOwner = threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);
        return {
          ...thread,
          ownerName: owner?.name || 'Pengguna',
          ownerAvatar: owner?.avatar,
        };
      });

      dispatch(receiveThreads(threadsWithOwner));
    } catch (error) {
      alert(error?.response?.data?.message || 'Gagal memuat threads');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({title, body, category}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await createThreadApi({title, body, category});
      dispatch(addThread(thread));
      return thread;
    } catch (error) {
      alert(error?.response?.data?.message || 'Gagal membuat thread');
      return null;
    } finally {
      dispatch(hideLoading());
    }
  };
}

// ===== OPTIMISTIC VOTE =====
// Update UI dulu (langsung), baru panggil API. Kalau API gagal, rollback.

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    if (!authUser) return;

    dispatch(updateThreadVote({threadId, userId: authUser.id, voteType: 'up'}));
    try {
      await upVoteThreadApi(threadId);
    } catch (error) {
      dispatch(updateThreadVote({threadId, userId: authUser.id, voteType: 'neutral'}));
      alert(error?.response?.data?.message || 'Gagal vote');
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    if (!authUser) return;

    dispatch(updateThreadVote({threadId, userId: authUser.id, voteType: 'down'}));
    try {
      await downVoteThreadApi(threadId);
    } catch (error) {
      dispatch(updateThreadVote({threadId, userId: authUser.id, voteType: 'neutral'}));
      alert(error?.response?.data?.message || 'Gagal vote');
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    if (!authUser) return;

    dispatch(updateThreadVote({threadId, userId: authUser.id, voteType: 'neutral'}));
    try {
      await neutralVoteThreadApi(threadId);
    } catch (error) {
      alert(error?.response?.data?.message || 'Gagal batal vote');
    }
  };
}

export {
  asyncPopulateThreads,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
