import { Action, createReducer, on } from '@ngrx/store';
import { initialState, postsAdapter, PostsState } from './posts.state';
import {
  addPostSuccess,
  loadPostsSuccess,
  updatePostSuccess,
  deletePostSuccess,
} from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, action) => {
    return postsAdapter.removeOne(action.id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
