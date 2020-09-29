import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../_models/Post';



@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  edit: boolean = false;
  timeStamp: string;
  neighborhood: string;

  constructor() { }

  ngOnInit(): void {
    this.neighborhood = this.post.Neighborhood ? this.post.Neighborhood + ', ' : '';
  }

  editPost() {
    this.edit = !this.edit;
    
  }

  editStatus($event) {
    this.edit = $event;
  }

}
