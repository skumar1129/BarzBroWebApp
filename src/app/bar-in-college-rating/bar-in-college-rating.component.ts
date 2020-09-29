import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostApiService } from '../_services/post-api.service';
import { PostDataService } from '../_services/post-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-bar-in-college-rating',
  templateUrl: './bar-in-college-rating.component.html',
  styleUrls: ['./bar-in-college-rating.component.css']
})
export class BarInCollegeRatingComponent implements OnInit {

  locBar: string;
  isLoading: boolean;
  locBarPosts;
  showPosts: boolean;
  noPostsFound: boolean;
  AddPostSub;
  startKey;
  postDataSub;
  barsInLoc;
  isListLoading: boolean;
  filter = new FormControl('');
  location: string;
  bar: string;
  rating: number;
  newBar = new FormControl('');
  newUser = new FormControl('');
  area = new FormControl('');
  barsInArea;

  constructor(private api: PostApiService, private data: PostDataService,
    private route: ActivatedRoute, private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.locBar = params.get('schoolbar');
      this.location = this.locBar.split('-')[0];
      this.bar = this.locBar.split('-')[1];
      this.refreshPost();
      this.AddPostSub = this.data.addPost$.subscribe(
        (post) => {
          this.addPost(post);
        }
      );
      this.api.getSchoolBar(this.location).subscribe(
        res => {
          this.barsInLoc = _.union(this.barsInLoc, res['Items']);
        },
        err => {
          this.alertify.error('Error Grabbing the Posts');
        }
      );
      this.api.getSchoolReg(this.location).subscribe(
        res => {
          this.barsInArea = _.union(this.barsInArea, res['Items']);
        },
        err => {
          this.alertify.error('Error Grabbing the Posts');
        }
      );
    }  
    );
    this.router.navigate(['/schoolbar/r', this.locBar]);
    this.showPosts = false;
    this.noPostsFound = true;
  }

  async refreshPost() {
    this.isLoading = true;
    this.locBarPosts = [];
    (await this.api.getSchoolBarRating(this.locBar)).subscribe(
      res => {
        this.isLoading = true;
        let data = res;
        
        if (_.has(res, 'LastEvaluatedKey')) {
          
          this.rating = res.LastEvaluatedKey.Rating;
          this.startKey = res.LastEvaluatedKey.Timestamp;
        } else {
          this.startKey = 0;
        }

        if (_.has(data, 'Items')) {
          this.locBarPosts = _.union(this.locBarPosts, res['Items']);
          if (this.locBarPosts.length == 0) {
            this.noPostsFound = true;
          } else {
            this.showPosts = true;
            this.noPostsFound = false;
          }
        }
        
      }, err => {
        this.alertify.error('Error Grabbing the Posts');
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      }

      
    );
      
  }

  async addPost(post) {
    this.locBarPosts.splice(0, 0, post);
    this.noPostsFound = false;
  }

  async onScrollDown() {
    if(this.startKey == 0) {
      return;
    }

    this.postDataSub = (await this.api.getSchoolBarRating(this.locBar, this.startKey, this.location, this.rating)).subscribe(
      res => {
        this.isLoading = true;
        let data = res;
        
        if (_.has(res, 'LastEvaluatedKey')) {
          this.rating = res.LastEvaluatedKey.Rating;
          this.startKey = res.LastEvaluatedKey.Timestamp;
        } else {
          this.startKey = 0;
        }
        
        if (_.has(data, 'Items')) {
          this.locBarPosts = _.union(this.locBarPosts, res['Items']);
          if (this.locBarPosts.length == 0) {
            this.noPostsFound = true;
          } else {
            this.showPosts = true;
            this.noPostsFound = false;
          }
        }
        
      }, err => {
        this.alertify.error('Error Grabbing Additional Posts');
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      }
    );
  }

  searchBar() {
    const locBar = this.location + '-' + this.newBar.value.toLowerCase();
    this.router.navigate(['schoolbar/r/', locBar]);
  }

  searchUser() {
    const locUser = this.location + '-' + this.newUser.value;
    this.router.navigate(['schooluser/r/', locUser]);
  }

  searchArea() {
    const locArea = this.location + '-' + this.area.value.toLowerCase();
    this.router.navigate(['schoolreg/r/', locArea]);
  }

  selectFilter() {
    this.router.navigate(['/schoolbar/', this.locBar]);
  }

}
