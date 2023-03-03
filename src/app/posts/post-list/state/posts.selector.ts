import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl) =>
    posts.find((post) => post.id === route.params['id'])
);
