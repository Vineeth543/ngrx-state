import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';

// export const ADD_POST_ACTION = '[posts page] add post';

export const addPost = createAction('add post', props<{ post: Post }>());

export const updatePost = createAction('update post', props<{ post: Post }>());

export const deletePost = createAction('delete post', props<{ id: number }>());
