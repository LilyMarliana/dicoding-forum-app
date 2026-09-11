import {describe, it, expect} from 'vitest';
import threadsReducer, {receiveThreads, addThread, updateThreadVote} from './reducer';

/**
 * skenario pengujian threadsReducer
 *
 * - threadsReducer
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by receiveThreads action
 *   - should add a new thread to the beginning of the list when given by addThread action
 *   - should add userId to upVotesBy and remove it from downVotesBy when voteType is "up"
 *   - should add userId to downVotesBy and remove it from upVotesBy when voteType is "down"
 *   - should remove userId from both upVotesBy and downVotesBy when voteType is "neutral"
 *   - should not mutate state when thread with given threadId is not found
 */
describe('threadsReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = {type: 'UNKNOWN'};

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by receiveThreads action', () => {
    const initialState = [];
    const threads = [
      {id: 'thread-1', title: 'Thread pertama', upVotesBy: [], downVotesBy: []},
    ];
    const action = receiveThreads(threads);

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(threads);
  });

  it('should add a new thread to the beginning of the list when given by addThread action', () => {
    const initialState = [
      {id: 'thread-1', title: 'Thread lama', upVotesBy: [], downVotesBy: []},
    ];
    const newThread = {id: 'thread-2', title: 'Thread baru', upVotesBy: [], downVotesBy: []};
    const action = addThread(newThread);

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toHaveLength(2);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should add userId to upVotesBy and remove it from downVotesBy when voteType is "up"', () => {
    const initialState = [
      {id: 'thread-1', title: 'Thread', upVotesBy: [], downVotesBy: ['user-1']},
    ];
    const action = updateThreadVote({threadId: 'thread-1', userId: 'user-1', voteType: 'up'});

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual(['user-1']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should add userId to downVotesBy and remove it from upVotesBy when voteType is "down"', () => {
    const initialState = [
      {id: 'thread-1', title: 'Thread', upVotesBy: ['user-1'], downVotesBy: []},
    ];
    const action = updateThreadVote({threadId: 'thread-1', userId: 'user-1', voteType: 'down'});

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual(['user-1']);
  });

  it('should remove userId from both upVotesBy and downVotesBy when voteType is "neutral"', () => {
    const initialState = [
      {id: 'thread-1', title: 'Thread', upVotesBy: ['user-1'], downVotesBy: []},
    ];
    const action = updateThreadVote({threadId: 'thread-1', userId: 'user-1', voteType: 'neutral'});

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should not mutate state when thread with given threadId is not found', () => {
    const initialState = [
      {id: 'thread-1', title: 'Thread', upVotesBy: [], downVotesBy: []},
    ];
    const action = updateThreadVote({threadId: 'thread-999', userId: 'user-1', voteType: 'up'});

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
});