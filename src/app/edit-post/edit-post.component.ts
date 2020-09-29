import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Post } from '../_models/Post';
import { PostApiService } from '../_services/post-api.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @Input() post: Post;
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
      location: this.post.Location,
      neighborhood: this.neighborhood.value.toLowerCase() ? this.neighborhood.value : this.post.Neighborhood,
      rating: this.rating.value ? parseInt(this.rating.value) : this.post.Rating,
      locBar: this.bar.value ? this.post.Location + '-' + this.bar.value.toLowerCase() : this.post.LocBar,
      locNeighborhood: this.neighborhood.value? this.post.Location + '-' + this.neighborhood.value.toLowerCase() : this.post.LocNeighborhood,
      locUser: this.post.LocUser,
      timestamp: this.post.Timestamp,
      username: this.post.Username
    };
    this.api.updatePost(item).subscribe(() => {
      this.editEvent.emit(this.edit);
      window.location.reload();
    }, err => {
      this.alertify.error('Error Updating Your Post');
    });
   
  }

  deleteEvent() {
    this.api.deletePost(this.post.Location, this.post.Timestamp).subscribe(() => {
      this.editEvent.emit(this.edit);
      window.location.reload();
    }, err => {
      this.alertify.error('Error Deleting Your Post');
    });
    
  }

}
