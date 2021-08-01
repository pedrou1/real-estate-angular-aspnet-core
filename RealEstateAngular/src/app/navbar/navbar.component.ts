import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isAuthenticated = this.auth.isAuthenticated;
  public isAdmin = this.auth.isAdmin;

  islogged:boolean;
  admin:boolean;
  
  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {

    this.isAuthenticated.subscribe(authenticated => {
      this.islogged = authenticated;
    });

    this.isAdmin.subscribe(admin => {
      this.admin = admin;
    });

  }

  
  logOut(){
    this.auth.logout();
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

}
