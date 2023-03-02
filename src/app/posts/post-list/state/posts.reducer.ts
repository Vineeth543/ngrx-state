import { Post } from 'src/app/models/posts.model';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';
import {
  addPost,
  deletePost,
  updatePost,
  loadPostsSuccess,
} from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts[state.posts.length - 1]?.id || 0) + 1;
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    const updatedPost = state.posts.map((post: Post) => {
      return post.id === action.post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(deletePost, (state, action) => {
    const updatedPost = state.posts.filter(
      (post: Post) => post.id !== action.id
    );
    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
