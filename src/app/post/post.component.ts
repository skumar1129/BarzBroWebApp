import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../_models/Post';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  timeStamp: string;
  neighborhood: string;

  
  
  

  constructor() { }

  ngOnInit(): void {
    this.timeStamp = moment.utc(this.post.Timestamp * 1000).fromNow();
    this.neighborhood = this.post.Neighborhood ? this.post.Neighborhood + ', ' : '';   
  }  


}
