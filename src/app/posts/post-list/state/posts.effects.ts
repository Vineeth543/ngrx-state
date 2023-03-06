import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import { getPosts } from './posts.selector';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
  dummyAction,
} from './posts.actions';

@Injectable()
export class PsotsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private postsService: PostsService
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts?.length) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return loadPostsSuccess({ posts });
            })
          );
        } else {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          return of(dummyAction());
        }
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
            this.store.dispatch(setLoadingSpinner({ status: false }));
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
        return this.postsService.updatePost(action.post).pipe(
          map(() => {
            const updatedPost: Update<Post> = {
              id: action.post.id ? action.post.id : '',
              changes: {
                ...action.post,
              },
            };
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return updatePostSuccess({ post: updatedPost });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
