import { combineReducers } from 'redux';
import { callingApi, createReducer, handleApiError, handleApiSuccess } from '../../shared/core/services/redux';

const initialPostsState = {}

const searchPosts = (state: any, payload: any) => {
  return callingApi(state);
};

const searchPostsSuccess = (state: any, payload: any) => {
  return handleApiSuccess(state, payload);
};

const searchPostsError = (state: any, payload: any) => {
  return handleApiError(state, payload);
};

const postsStrategies = {
  SEARCH_POSTS: searchPosts,
  SEARCH_POSTS_SUCCESS: searchPostsSuccess,
  SEARCH_POSTS_ERROR: searchPostsError,
  __default__: (state: any) => state,
};
const postsController = createReducer(postsStrategies, {
  ...initialPostsState,
});

/* commonReducer */
export const commonReducer = combineReducers({
  postsController,
});
