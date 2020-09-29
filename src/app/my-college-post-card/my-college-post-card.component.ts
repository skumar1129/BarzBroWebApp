import { Component, OnInit, Input } from '@angular/core';
import { CollegePost } from '../_models/CollegPost';

@Component({
  selector: 'app-my-college-post-card',
  templateUrl: './my-college-post-card.component.html',
  styleUrls: ['./my-college-post-card.component.css']
})
export class MyCollegePostCardComponent implements OnInit {

  @Input() post: CollegePost;
  edit: boolean = false;
  timeStamp: string;
  neighborhood: string;

  constructor() { }

  ngOnInit(): void {
    this.neighborhood = this.post.Region ? this.post.Region+ ', ' : '';
  }

  editPost() {
    this.edit = !this.edit;
    
  }

  editStatus($event) {
    this.edit = $event;
  }

}
