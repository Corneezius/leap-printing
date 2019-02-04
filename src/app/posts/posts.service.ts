import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}
  getPosts() {
    this.http.get<{message: 'string', posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        console.log(postData);
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {

    this.http
      .post<{ message: string, post: Post }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        console.log(responseData.message);
        console.log(responseData.post);
        this.posts.push(responseData.post);
        this.postsUpdated.next([...this.posts]);
      });
  }
  deletePost(id) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id)
    .subscribe(responseData => {
      const updatedPosts = this.posts.filter(post => post.Id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  printPdf(post) {
    this.http.post('http://localhost:3000/api/print' , post)
      .subscribe(resp => {
        console.log(resp);
        this.http.get('http://localhost:3000/api/pdf/' + post.Id, { responseType: 'arraybuffer'})
          .subscribe((file: any) => {
            let blob = new Blob([file], {type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = blobUrl;
            document.body.appendChild(iframe);
            iframe.contentWindow.print();
          });
    });
  }
}
