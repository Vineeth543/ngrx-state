import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Post } from 'src/app/models/posts.model';
import { getPosts } from './state/posts.selector';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from './state/posts.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
})
export class PostListComponent {
  posts$!: Observable<Post[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: string): void {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(deletePost({ id }));
    this.router.navigate(['posts']);
  }
}
