import {createSlice} from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      if (state) state.comments.unshift(action.payload);
    },
    updateThreadDetailVote: (state, action) => {
      const {userId, voteType} = action.payload;
      if (!state) return;
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      if (voteType === 'up') state.upVotesBy.push(userId);
      if (voteType === 'down') state.downVotesBy.push(userId);
    },
    updateCommentVote: (state, action) => {
      const {commentId, userId, voteType} = action.payload;
      if (!state) return;
      const comment = state.comments.find((c) => c.id === commentId);
      if (!comment) return;
      comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
      comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      if (voteType === 'up') comment.upVotesBy.push(userId);
      if (voteType === 'down') comment.downVotesBy.push(userId);
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  updateThreadDetailVote,
  updateCommentVote,
} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
