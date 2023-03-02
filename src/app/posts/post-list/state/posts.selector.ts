import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = (id: string) =>
  createSelector(getPostsState, (state: { posts: Post[] }) =>
    state.posts.find((post) => post.id === id)
  );
