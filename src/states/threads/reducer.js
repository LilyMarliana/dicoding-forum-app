import {createSlice} from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => {
      state.unshift(action.payload);
    },
    // dipakai buat optimistic vote nanti
    updateThreadVote: (state, action) => {
      const {threadId, userId, voteType} = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (!thread) return;

      // bersihin dulu jejak vote user ini dari ketiga array
      thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

      if (voteType === 'up') thread.upVotesBy.push(userId);
      if (voteType === 'down') thread.downVotesBy.push(userId);
      // voteType === 'neutral' -> gak ditambahin ke mana-mana (sudah bersih di atas)
    },
  },
});

export const {receiveThreads, addThread, updateThreadVote} = threadsSlice.actions;
export default threadsSlice.reducer;
