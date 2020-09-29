import { Component, OnInit } from '@angular/core';
import { PostApiService } from '../_services/post-api.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  location = new FormControl('', Validators.required);
  bar = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);
  neighborhood = new FormControl('');
  constructor(private api: PostApiService, private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  submit() {

    const item = {
      location: this.location.value,
      bar: this.bar.value,
      content: this.content.value,
      neighborhood: this.neighborhood.value,
      rating: parseInt(this.rating.value)
    };
  
    this.api.addPost(item).subscribe(
      () => {
        this.alertify.success('Created Your Post');
        this.router.navigate(['/post/user']);
      }, err => {
        this.alertify.error('Error Adding Your Post');
        this.alertify.warning('Make sure to fill out the required fields');
      }
    );
    
  }

  cancel() {
    this.router.navigate(['/post/user']);
  }
}
