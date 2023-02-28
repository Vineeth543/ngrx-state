import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { getPostById } from '../post-list/state/posts.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatePost } from '../post-list/state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.less'],
})
export class EditPostComponent implements OnInit {
  post!: Post;
  postForm!: FormGroup;
  // id: number = 0;
  // post$: Observable<Post> = new Observable<Post>();
  // id$: Observable<number> = new Observable<number>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.id$ = this.route.paramMap.pipe(
    //   tap((data) => console.log(data.get('id'))),
    //   map((params: ParamMap) => (this.id = Number(params.get('id'))))
    // );

    // this.post$ = this.store.select(getPostById(0)).pipe(
    //   tap((data) => console.log(data)),
    //   map((post) => {
    //     console.log(post);
    //     this.post = post;
    //     this.createForm();
    //     return post;
    //   })
    // );

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.store
        .select(getPostById(Number(params.get('id'))))
        .subscribe((post) => {
          this.post = post ? post : { id: 0, title: '', description: '' };
          this.createForm();
        });
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post?.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
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

  onSubmit(): void {
    if (!this.postForm.valid) return;
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: Post = {
      id: this.post.id,
      title,
      description,
    };
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['/posts']);
  }
}
