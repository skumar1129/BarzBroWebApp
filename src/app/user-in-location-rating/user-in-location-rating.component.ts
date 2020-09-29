import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostApiService } from '../_services/post-api.service';
import { PostDataService } from '../_services/post-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-in-location-rating',
  templateUrl: './user-in-location-rating.component.html',
  styleUrls: ['./user-in-location-rating.component.css']
})
export class UserInLocationRatingComponent implements OnInit {

  locUser: string;
  isLoading: boolean;
  locUserPosts;
  showPosts: boolean;
  noPostsFound: boolean;
  AddPostSub;
  startKey;
  postDataSub;
  isListLoading: boolean;
  filter = new FormControl('');
  location: string;
  user: string;
  rating: number;
  bar = new FormControl('');
  newUser = new FormControl('');
  nbhood = new FormControl('');
  barsInLoc;
  barsInNbhood;
  constructor(private api: PostApiService, private data: PostDataService,
    private route: ActivatedRoute, private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.locUser = params.get('locUser');
      this.location = this.locUser.split('-')[0];
      this.user = this.locUser.split('-')[1];
      this.refreshPost();
      this.AddPostSub = this.data.addPost$.subscribe(
        (post) => {
          this.addPost(post);
        }
      );
      this.api.getBarsInLoc(this.location).subscribe(
        res => {
          this.barsInLoc = _.union(this.barsInLoc, res['Items']);
        },
        err => {
          this.alertify.error('Error Grabbing the Posts');
        }
      );
      this.api.getPostNbhood(this.location).subscribe(
        res => {
          this.barsInNbhood = _.union(this.barsInNbhood, res['Items']);
        },
        err => {
          this.alertify.error('Error Grabbing the Posts');
        }
      );
    }  
    );
    this.router.navigate(['/locUser/r/', this.locUser]);
    this.showPosts = false;
    this.noPostsFound = true;
  }

  async refreshPost() {
    this.isLoading = true;
    this.locUserPosts = [];
    (await this.api.getLocUserRating(this.locUser)).subscribe(
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
          this.locUserPosts = _.union(this.locUserPosts, res['Items']);
          if (this.locUserPosts.length == 0) {
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
    this.locUserPosts.splice(0, 0, post);
    this.noPostsFound = false;
  }

  async onScrollDown() {
    if(this.startKey == 0) {
      return;
    }

    this.postDataSub = (await this.api.getLocUserRating(this.locUser, this.startKey, this.location, this.rating)).subscribe(
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
          this.locUserPosts = _.union(this.locUserPosts, res['Items']);
          if (this.locUserPosts.length == 0) {
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
    this.router.navigate(['locBar/r/', locBar]);
  }

  searchUser() {
    const locUser = this.location + '-' + this.newUser.value;
    this.router.navigate(['locUser/r/', locUser]);
  }

  searchNbhood() {
    const locNbhood = this.location + '-' + this.nbhood.value.toLowerCase();
    this.router.navigate(['nbhood/r/', locNbhood]);
  }

  selectFilter() {
    this.router.navigate(['/locUser/', this.locUser]);
  }


}
