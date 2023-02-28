import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter/counter.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterCustomInputComponent } from './counter/counter-custom-input/counter-custom-input.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AddPostsComponent } from './posts/add-posts/add-posts.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  {
    path: 'posts',
    component: PostListComponent,
    children: [
      { path: 'add', component: AddPostsComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent,
  HeaderComponent,
  CounterComponent,
  CounterOutputComponent,
  CounterButtonsComponent,
  CounterCustomInputComponent,
  PostListComponent,
  AddPostsComponent,
  EditPostComponent,
];
