import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin:boolean;
  itemInCart:number;
  
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    if(localStorage.getItem('isAdmin') == "true"){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
    this.service.cartItems.subscribe(d=>{
      this.itemInCart = d.length;
    })
  }

}
