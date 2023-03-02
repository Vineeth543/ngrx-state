import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { loadPosts, loadPostsSuccess } from './posts.actions';

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
}
