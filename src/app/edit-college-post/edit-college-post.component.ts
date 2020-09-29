import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CollegePost } from '../_models/CollegPost';
import { PostApiService } from '../_services/post-api.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-edit-college-post',
  templateUrl: './edit-college-post.component.html',
  styleUrls: ['./edit-college-post.component.css']
})
export class EditCollegePostComponent implements OnInit {

  @Input() post: CollegePost;
  @Output() editEvent = new EventEmitter<boolean>();
  edit: boolean = false;
  content = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);
  bar = new FormControl('', Validators.required);
  neighborhood = new FormControl('', Validators.required);
  constructor(private api: PostApiService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  updateEvent() {
    const item = {
      bar: this.bar.value ? this.bar.value.toLowerCase() : this.post.Bar,
      content: this.content.value ? this.content.value : this.post.Content,
      id: this.post.Id,
      location: this.post.School,
      region: this.neighborhood.value ? this.neighborhood.value.toLowerCase() : this.post.Region,
      rating: this.rating.value ? parseInt(this.rating.value) : this.post.Rating,
      schoolBar: this.bar.value ? this.post.School + '-' + this.bar.value.toLowerCase() : this.post.SchoolBar,
      schoolReg: this.neighborhood.value ? this.post.School + '-' + this.neighborhood.value.toLowerCase() : this.post.SchoolReg,
      schoolUser: this.post.SchoolUser,
      timestamp: this.post.Timestamp,
      username: this.post.Username,
      school: this.post.School
    };
    this.api.updateCollegePost(item).subscribe(() => {
      this.editEvent.emit(this.edit);
      window.location.reload();
    }, err => {
      this.alertify.error('Error Updating Your Post');
    });
   
  }

  deleteEvent() {
    this.api.deleteCollegePost(this.post.School, this.post.Timestamp).subscribe(() => {
      this.editEvent.emit(this.edit);
      window.location.reload();
    }, err => {
      this.alertify.error('Error Deleting Your Post');
    });
    
  }

}
