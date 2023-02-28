import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './post-list/state/posts.reducer';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [
      { path: 'add', component: AddPostsComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  declarations: [PostListComponent, AddPostsComponent, EditPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('posts', postsReducer),
    RouterModule.forChild(routes),
  ],
})
export class PostsModule {}
