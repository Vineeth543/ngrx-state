import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from './state/posts.actions';
import { getPosts } from './state/posts.selector';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
})
export class PostListComponent {
  posts$: Observable<Post[]> = new Observable<Post[]>();

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts).pipe();
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: string): void {
    this.store.dispatch(deletePost({ id }));
    this.router.navigate(['posts']);
  }
}
