import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../post-list/state/posts.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.less'],
})
export class AddPostsComponent {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onAddPost(): void {
    if (!this.postForm.valid) return;
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addPost({ post }));
    this.router.navigate(['/posts']);
  }

  showTitleErrors(): string | void {
    const titleForm = this.postForm.get('title');
    if (titleForm?.touched && !titleForm.valid) {
      if (titleForm.errors?.['required']) {
        return 'Title is required';
      }
      if (titleForm.errors?.['minlength']) {
        return 'Title must atleast have 6 characters';
      }
    }
  }

  showDescriptionErrors(): string | void {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.['required']) {
        return 'Description is required';
      }
      if (descriptionForm.errors?.['minlength']) {
        return 'Description must atleast have 10 characters';
      }
    }
  }
}
