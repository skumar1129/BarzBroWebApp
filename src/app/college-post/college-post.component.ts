import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PostApiService } from '../_services/post-api.service';
import { PostDataService } from '../_services/post-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-college-post',
  templateUrl: './college-post.component.html',
  styleUrls: ['./college-post.component.css']
})
export class CollegePostComponent implements OnInit {

  location: string;
  isLoading: boolean;
  locationPosts;
  barsInLoc;
  showPosts: boolean;
  noPostsFound: boolean;
  AddPostSub;
  startKey;
  postDataSub;
  isListLoading: boolean;
  bar = new FormControl('');
  user = new FormControl('');
  area = new FormControl('');
  barsInArea;
  


  
  constructor(private api: PostApiService, private data: PostDataService,
    private router: Router, private route: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.location = params.get('school');
      this.barsInLoc = [];
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
    this.router.navigate(['/school', this.location]);
    this.showPosts = false;
    this.noPostsFound = true;
  
  }

  

  async refreshPost() {
    this.isLoading = true;
    this.locationPosts = [];
    (await this.api.getSchoolPostsTime(this.location)).subscribe(
      res => {
        this.isLoading = true;
        let data = res;
        
        if (_.has(res, 'LastEvaluatedKey')) {
          this.startKey = res.LastEvaluatedKey.Timestamp;
        } else {
          this.startKey = 0;
        }

        if (_.has(res, 'Items')) {
          this.locationPosts = _.union(this.locationPosts, res['Items']);
          if (this.locationPosts.length == 0) {
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
    this.locationPosts.splice(0, 0, post);
    this.noPostsFound = false;
  }

  async onScrollDown() {
   
    if(this.startKey == 0) {
      return;
    }

    this.postDataSub = (await this.api.getSchoolPostsTime(this.location, this.startKey)).subscribe(
      res => {
        this.isLoading = true;
        let data = res;
        
        if (_.has(res, 'LastEvaluatedKey')) {
          this.startKey = res.LastEvaluatedKey.Timestamp;
        } else {
          this.startKey = 0;
        }

        if (_.has(res, 'Items')) {
          this.locationPosts = _.union(this.locationPosts, res['Items']);
          if (this.locationPosts.length == 0) {
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
    const locBar = this.location + '-' + this.bar.value.toLowerCase();
    this.router.navigate(['schoolbar/', locBar]);
  }

  searchUser() {
    const locUser = this.location + '-' + this.user.value;
    this.router.navigate(['schooluser/', locUser]);
  }

  selectFilter() {
    this.router.navigate(['school/r/', this.location])
  }

  searchArea() {
    const locArea = this.location + '-' + this.area.value.toLowerCase();
    this.router.navigate(['schoolreg/', locArea]);
  }

  createPost() {
    this.router.navigate(['/post/school/create']);
  }

}
