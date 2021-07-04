import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  islogged:boolean;
  id:string;

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.islogged = false;
    this.refreshAuth();
  }

  refreshAuth(){
    if(localStorage.getItem('isLoggedIn') == 'true'){
      this.islogged = true;
    }
  }

  logOut(){
    this.service.logout();
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

}
