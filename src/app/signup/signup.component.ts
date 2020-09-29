import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  name = new FormControl('');
  email = new FormControl(''); 
  password = new FormControl('');
  confirm = new FormControl('');
  code = new FormControl('');
  constructor(private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  signUp() {
    if (this.password.value === this.confirm.value) {
      Auth.signUp({
        username: this.name.value,
        password: this.password.value,
        attributes: {
          email: this.email.value
        }
      })
      .then(() => {
        this.alertify.success('Sign Up Succesful');
        this.alertify.message('Now confirm your email to complete registration');
        this.submitted = true;
      }
      ).catch((err) =>{
        this.alertify.error('Error Signing Up');
        this.alertify.warning('Make sure your password is at least 8 characters, and has at least one number, one uppercase, and one lowercase character')
      }  
      );
    }
    else {
      this.alertify.error('Make sure your passwords match!');
    } 
  }

  signIn() {
    this.router.navigate(['/']);
  }

  confirmCode() {
    Auth.confirmSignUp(this.name.value, this.code.value)
      .then(() => {
        this.alertify.success('You are successfully registered!')
        localStorage.setItem('name', this.name.value);
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        this.alertify.error('Error confirming your code. Try again or resend the code');
      });
  }

  resend() {
    Auth.resendSignUp(this.name.value)
    .then(() => {
      this.alertify.success('Code resent');
    })
    .catch((err) => {
      this.alertify.error('Error resending code');
    });
  }
}
