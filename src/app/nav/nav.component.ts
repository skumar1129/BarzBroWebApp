import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(private auth: AuthService) { }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('remember');
    localStorage.removeItem('name');
  }

  
}
