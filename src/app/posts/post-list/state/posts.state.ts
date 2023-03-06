import { EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/posts.model';
import { createEntityAdapter } from '@ngrx/entity';

export interface PostsState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState();
