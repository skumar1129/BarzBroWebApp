import { Component, OnInit, Input } from '@angular/core';
import { CollegePost } from '../_models/CollegPost';
import * as moment from 'moment';

@Component({
  selector: 'app-college-post-card',
  templateUrl: './college-post-card.component.html',
  styleUrls: ['./college-post-card.component.css']
})
export class CollegePostCardComponent implements OnInit {

  @Input() post: CollegePost;
  timeStamp: string;
  neighborhood: string;

  
  
  

  constructor() { }

  ngOnInit(): void {
    this.timeStamp = moment.utc(this.post.Timestamp * 1000).fromNow();
    this.neighborhood = this.post.Region ? this.post.Region + ', ' : '';   
  }  

}
