import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/posts.model';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../post-list/state/posts.actions';
import { getPostById } from '../post-list/state/posts.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less'],
})
export class EditPostComponent implements OnInit {
  postId!: string;
  postForm!: FormGroup;
  post$!: Observable<Post>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.post$ = this.store.select(getPostById).pipe(
      map((post: Post | undefined) => {
        this.postId = post?.id as string;
        this.createForm(post?.title, post?.description);
        return post as Post;
      })
    );
  }

  createForm(title: string | undefined, description: string | undefined): void {
    this.postForm = new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showFormErrors(field: string): string | void {
    const targetField = this.postForm.get(field);
    if (targetField?.touched && !targetField.valid) {
      if (targetField.errors?.['required']) {
        return field[0].toUpperCase() + field.slice(1) + ' is required';
      }
      if (targetField.errors?.['minlength'] && field === 'title') {
        return 'Title must atleast have 6 characters';
      }
      if (targetField.errors?.['minlength'] && field === 'description') {
        return 'Description must atleast have 10 characters';
      }
    }
  }

  onSubmit(): void {
    if (!this.postForm.valid) return;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    const post: Post = {
      id: this.postId,
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['/posts']);
  }
}
