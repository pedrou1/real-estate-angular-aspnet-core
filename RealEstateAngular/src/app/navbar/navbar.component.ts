import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin:boolean;
  
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('isAdmin') == "true"){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }

}
