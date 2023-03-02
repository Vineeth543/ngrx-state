import { map, mergeMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';

@Injectable()
export class PsotsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => {
        return this.postsService
          .getPosts()
          .pipe(map((posts) => loadPostsSuccess({ posts })));
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      mergeMap((action) => {
        return this.postsService
          .updatePost(action.post)
          .pipe(map(() => updatePostSuccess({ post: action.post })));
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this.postsService
          .deletePost(action.id)
          .pipe(map(() => deletePostSuccess({ id: action.id })));
      })
    );
  });
}
