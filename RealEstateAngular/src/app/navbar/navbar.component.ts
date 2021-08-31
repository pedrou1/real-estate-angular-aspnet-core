import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';
import { SharedService } from '../shared.service';

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
  itemsInFav:number;
  items = [];
  propPhotourl:string = "https://realestate.azurewebsites.net/ImagesUpload/"
  
  constructor(private auth: AuthService, private router:Router, private service:SharedService) { }

  ngOnInit(): void {

    this.isAuthenticated.subscribe(authenticated => {
      this.islogged = authenticated;
    });

    this.isAdmin.subscribe(admin => {
      this.admin = admin;
    });

    this.service.favItems.subscribe(v=>{
      this.itemsInFav = v.length;
    })

    this.service.favItems.subscribe(data=>{
      this.items = data;
    });

  }

  delete(i:number){
    this.items.splice(i,1);
    this.service.setFavs(this.items);
  }

  logOut(){
    this.auth.logout();
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

}
