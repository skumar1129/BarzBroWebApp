import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logIn: boolean = false;
  
  constructor(private router: Router, private alertify: AlertifyService) { }

  async login(user: string, password: string) {
    Auth.signIn(user, password)
    .then(() => {
      localStorage.setItem('name', user);
      this.router.navigate(['/home']);
      this.alertify.success('Log In Successful');
    }
    ).catch((err) => {
      this.alertify.error('Error Signing In');
      this.alertify.warning('Make sure your username and password are correct');
    }
    );
    this.logIn = true;
   }

  async logout() {
    Auth.signOut()
    .then(() => {
      localStorage.removeItem('name');
      this.router.navigate(['/']);
      this.alertify.success('Logged Out');
    }
    ).catch((err) =>
      this.alertify.error('Error Logging Out')
    );
    this.logIn = false;
  }

  loggedIn(): boolean {
    if (localStorage.getItem('name')){
      return true;
    };
    return this.logIn;
  }  


}
