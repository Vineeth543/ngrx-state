import { counterReducer } from '../counter/state/counter.reducer';
import { CounterState } from '../counter/state/counter.state';
import { postsReducer } from '../posts/post-list/state/posts.reducer';
import { PostsState } from '../posts/post-list/state/posts.state';

export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const AppReducer = {
  counter: counterReducer,
  posts: postsReducer,
};
