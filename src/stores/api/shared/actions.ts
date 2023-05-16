import * as types from 'stores/types';

export const searchPosts = (payload: any) => ({
  type: types.SEARCH_POSTS,
  payload
});

export const searchPostsSuccess = (payload: any) => ({
  type: types.SEARCH_POSTS_SUCCESS,
  payload
});

export const searchPostsError = (payload: any) => ({
  type: types.SEARCH_POSTS_ERROR,
  payload
});
