import {
  getThreadDetail,
  createComment as createCommentApi,
  upVoteThread as upVoteThreadApi,
  downVoteThread as downVoteThreadApi,
  neutralVoteThread as neutralVoteThreadApi,
  upVoteComment as upVoteCommentApi,
  downVoteComment as downVoteCommentApi,
  neutralVoteComment as neutralVoteCommentApi,
} from '../../api';
import {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  updateThreadDetailVote,
  updateCommentVote,
} from './reducer';
import {showLoading, hideLoading} from '../loadingBar/reducer';

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetail());
    try {
      const detail = await getThreadDetail(threadId);
      dispatch(receiveThreadDetail(detail));
    } catch (error) {
      alert(error?.response?.data?.message || 'Gagal memuat detail thread');
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({threadId, content}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await createCommentApi({threadId, content});
      dispatch(addComment(comment));
    } catch (error) {
      alert(error?.response?.data?.message || 'Gagal mengirim komentar');
    } finally {
      dispatch(hideLoading());
    }
  };
}

// ===== VOTE THREAD (versi halaman detail) =====

function asyncVoteThreadDetail(threadId, voteType) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    if (!authUser) return;

    dispatch(updateThreadDetailVote({userId: authUser.id, voteType}));
    try {
      if (voteType === 'up') await upVoteThreadApi(threadId);
      if (voteType === 'down') await downVoteThreadApi(threadId);
      if (voteType === 'neutral') await neutralVoteThreadApi(threadId);
    } catch (error) {
      dispatch(updateThreadDetailVote({userId: authUser.id, voteType: 'neutral'}));
      alert(error?.response?.data?.message || 'Gagal vote');
    }
  };
}

// ===== VOTE COMMENT =====

function asyncVoteComment(threadId, commentId, voteType) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    if (!authUser) return;

    dispatch(updateCommentVote({commentId, userId: authUser.id, voteType}));
    try {
      if (voteType === 'up') await upVoteCommentApi(threadId, commentId);
      if (voteType === 'down') await downVoteCommentApi(threadId, commentId);
      if (voteType === 'neutral') await neutralVoteCommentApi(threadId, commentId);
    } catch (error) {
      dispatch(updateCommentVote({commentId, userId: authUser.id, voteType: 'neutral'}));
      alert(error?.response?.data?.message || 'Gagal vote komentar');
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncVoteThreadDetail,
  asyncVoteComment,
};
