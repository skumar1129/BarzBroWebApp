import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forget: boolean = false;
  sent: boolean = false;
  name = new FormControl('');
  password = new FormControl('');
  remember = new FormControl('');
  newPassword = new FormControl('');
  confirm = new FormControl('');
  code = new FormControl('');
  constructor(private auth: AuthService, private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    if (localStorage.getItem('remember')){
      this.router.navigate(['/home'])
    }    
  }

  submit() {
    this.auth.login(this.name.value, this.password.value);
    if (this.remember.value){
      localStorage.setItem('remember', 'on');
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  clickForget() {
    this.forget = true;
  }

  goBack() {
    this.forget = false;
  }

  sendCode() {
    Auth.forgotPassword(this.name.value)
      .then(() => {
        this.alertify.success('Code sent out');
        this.sent = true;
      })
      .catch((err) => {
        this.alertify.error('Error sending code out');
        this.alertify.warning('Make sure your username is correct');
      })
      
  }

  submitNewPassword() {
    if (this.newPassword.value === this.confirm.value) {
      Auth.forgotPasswordSubmit(this.name.value, this.code.value, this.newPassword.value)
        .then(() => {
          this.alertify.success('New password submitted!');
          this.sent = false;
          this.forget = false;
        })
        .catch((err) => {
          this.alertify.error('Error submitting new password');
          this.alertify.warning('Make sure you are submitting the most recent code');
        })
    }
    else {
      this.alertify.error('Make sure your passwords match');
    }
  }

  
}
