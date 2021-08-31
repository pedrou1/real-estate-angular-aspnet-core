import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  PropertyList:any=[];
  propPhotourl:string = "https://realestate.azurewebsites.net/ImagesUpload/"

  constructor(private sharedService:SharedService,private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.refreshPropertyList();
    this.auth.updateNavbar();
  }

  refreshPropertyList(){
    this.sharedService.getPropertyList().subscribe(data =>{
      this.PropertyList = data;
    })
  }

  addToFav(property) {
    this.animate(property.property_id);
    this.sharedService.addItem(property);
  }

  onSelect(property){
    this.router.navigate(['/property-detail',property.property_id])
  }

  animate(property_id){
    this.sharedService.animateButton(property_id);
  }
}
