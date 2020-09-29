import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostApiService } from '../_services/post-api.service';
import { PostDataService } from '../_services/post-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-location-rating-post',
  templateUrl: './location-rating-post.component.html',
  styleUrls: ['./location-rating-post.component.css']
})
export class LocationRatingPostComponent implements OnInit {

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
  rating: number;
  nbhood = new FormControl('');
  barsInNbhood;


  
  constructor(private api: PostApiService, private data: PostDataService,
    private router: Router, private route: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.location = params.get('loc');
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
    this.router.navigate(['/location/r/', this.location]);
    this.showPosts = false;
    this.noPostsFound = true;
  
  }

  

  async refreshPost() {
    this.isLoading = true;
    this.locationPosts = [];
    (await this.api.getLocPostsRating(this.location)).subscribe(
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

    this.postDataSub = (await this.api.getLocPostsRating(this.location, this.startKey, this.rating)).subscribe(
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
    this.router.navigate(['locBar/r/', locBar]);
  }

  searchUser() {
    const locUser = this.location + '-' + this.user.value;
    this.router.navigate(['locUser/r/', locUser]);
  }

  selectFilter() {
    this.router.navigate(['location/', this.location])
  }

  searchNbhood() {
    const locNbhood = this.location + '-' + this.nbhood.value.toLowerCase();
    this.router.navigate(['nbhood/r/', locNbhood]);
  }

  createPost() {
    this.router.navigate(['/post/create']);
  }
}
