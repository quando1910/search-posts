import { get } from 'shared/core/services/saga';
import * as types from 'stores/types';
import { 
  all, 
  put, 
  takeLatest 
} from 'redux-saga/effects';
import { searchPostsSuccess } from './actions';
import { Post } from 'shared/models/Post';

function* searchPosts({ payload, resolve, reject }: any): any {
  try {
    const res = yield get(['/posts/search'], {
      ...payload,
      skip: 0,
      limit: 150
    });
    let temp = res;
    if (payload.userId) {
      temp.posts = temp.posts.filter((x: Post) => +x.userId === +payload.userId);
    }
    if (payload.tags) {
      temp.posts = temp.posts.filter((x: Post) => x.tags.includes(payload.tags));
    }
    if (payload.reactions) {
      temp.posts = temp.posts.filter((x: Post) => +x.reactions === +payload.reactions);
    }

    if (resolve) resolve(temp);
    yield put(searchPostsSuccess(temp));
  } catch (error) {
    if (reject) reject(error);
    yield put(searchPostsSuccess(error));
  }
}


export function* watchShared() {
  yield all([
    takeLatest(types.SEARCH_POSTS, searchPosts),
  ]);
}
