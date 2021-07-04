import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  PropertyList:any=[];
  propPhotourl:string = "http://localhost:46687/ImagesUpload/"

  constructor(private sharedService:SharedService,private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn') == 'true'){
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
      this.refreshPropertyList();
    }
  }
  else{
    this.refreshPropertyList();
  }
  }

  refreshPropertyList(){
    this.sharedService.getPropertyList().subscribe(data =>{
      this.PropertyList = data;
    })
  }

  onSelect(property){
    this.router.navigate(['/property-detail',property.property_id])
  }
}
