import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PostApiService } from '../_services/post-api.service';
import { PostDataService } from '../_services/post-data.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-my-post-college',
  templateUrl: './my-post-college.component.html',
  styleUrls: ['./my-post-college.component.css']
})
export class MyPostCollegeComponent implements OnInit {

  isLoading: boolean;
  userPosts;
  showPosts: boolean;
  noPostsFound: boolean;
  AddPostSub;
  startKey;
  postDataSub;
  isListLoading: boolean;
  location: string;

  constructor(private api: PostApiService, private data: PostDataService,
    private router: Router, private alertify: AlertifyService) { }
  
  ngOnInit() {
    this.showPosts = false;
    this.noPostsFound = true;
    this.refreshPosts();
    this.AddPostSub = this.data.addPost$.subscribe(
      (post) => {
        this.addPost(post);
      }
    );
  }

  refreshPosts() {
    this.isLoading = true;
    this.userPosts = [];
    this.api.getSchoolUser().subscribe(
      res => {
        this.isLoading  = true;
        let data = res;

        if (_.has(data, 'LastEvaluatedKey')) {
  
          this.startKey = res.LastEvaluatedKey.Timestamp;
          this.location = res.LastEvaluatedKey.School;
          
        } else {
          this.startKey = 0;
        }

        if (_.has(data, 'Items')){
          this.userPosts = _.union(this.userPosts, res['Items']);
          if (this.userPosts.length == 0) {
            this.noPostsFound = true;
          } else {
            this.showPosts = true;
            this.noPostsFound = false;
          }
        }

      }, err => {
        this.alertify.error('Error Grabbing Your Posts');
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      }
    );
  }
  
  addPost(post) {
    this.userPosts.splice(0, 0, post);
    this.noPostsFound = false;
  }

  createPost() {
    this.router.navigate(['/post/school/create']);
  }

  onScrollDown() {
    
    if(this.startKey == 0) {
      return;
    }

    this.isListLoading = true;
    this.postDataSub = this.api.getSchoolUser(this.startKey, this.location).subscribe(
      res => {
        let data = res;

        if (_.has(data, 'LastEvaluatedKey')) {
          this.startKey = res.LastEvaluatedKey.Timestamp;
          this.location = res.LastEvaluatedKey.School;
        } else {
          this.startKey = 0;
        }

        if (_.has(data, 'Items')){
          this.userPosts = _.union(this.userPosts, res['Items']);
          if (this.userPosts.length == 0) {
            this.noPostsFound = true;
          } else {
            this.showPosts = true;
            this.noPostsFound = false;
          }
        }

      }, err => {
        this.alertify.error('Error Grabbing Additional Posts');
        this.isListLoading = false;
      }, () => {
        this.isListLoading = false;
      }
    )
  }

  selectedFilter() {
    this.router.navigate(['/post/user']);
  }
}
