import {configureStore} from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isLoadingReducer from './loadingBar/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isLoading: isLoadingReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
  },
});

export default store;
