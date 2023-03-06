import { postsAdapter, PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

export const getPostEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => posts[route.params['id']]
);
