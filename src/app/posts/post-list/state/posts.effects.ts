import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import {
  addPost,
  addPostSuccess,
  loadPosts,
  loadPostsSuccess,
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
            const post = { ...action.post, id: +data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });
}
