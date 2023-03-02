import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from '../models/posts.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://angular-ngrx-c45dc-default-rtdb.firebaseio.com/posts.json`
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ id: key, ...data[key] });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://angular-ngrx-c45dc-default-rtdb.firebaseio.com/posts.json`,
      post
    );
  }

  updatePost(post: Post) {
    const postData = {
      [post.id as string]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://angular-ngrx-c45dc-default-rtdb.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id: string) {
    console.log('Post delete initiated', id);
    return this.http.delete(
      `https://angular-ngrx-c45dc-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
