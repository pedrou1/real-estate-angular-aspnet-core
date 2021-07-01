import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  islogged:boolean;
  id:string;

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.islogged = false;
    this.refreshAuth();
  }

  refreshAuth(){
    this.id = localStorage.getItem('token');
    if(localStorage.getItem('isLoggedIn') == 'true'){
      this.islogged = true;
    }
  }

  logOut(){
    this.service.logout();
  }

}
