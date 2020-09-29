import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Post } from '../_models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  private announceAddPostSource = new Subject();
  addPost$ = this.announceAddPostSource.asObservable();

  constructor() { }

  announceAddPost(post: Post) {
    this.announceAddPostSource.next(post);
  }


}
