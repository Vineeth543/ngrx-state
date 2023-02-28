import { Action, createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { addPost, updatePost } from './posts.actions';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = state.posts.length + 1;
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
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
