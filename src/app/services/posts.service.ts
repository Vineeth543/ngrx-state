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
          let id = 1;
          for (let key in data) {
            posts.push({ id: id++, ...data[key] });
          }
          return posts;
        })
      );
  }
}
