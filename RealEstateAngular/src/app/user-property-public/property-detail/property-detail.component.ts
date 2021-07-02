import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  propertyId:number;
  PropertyList:any=[];
  isFound:boolean = true;
  propPhotourl:string = "http://localhost:46687/ImagesUpload/"

  constructor(private route:ActivatedRoute,private sharedService:SharedService) { }

  ngOnInit(): void {
    this.propertyId = parseInt(this.route.snapshot.paramMap.get('id'));
     this.sharedService.getPropertyById(this.propertyId).subscribe(data => {
       this.PropertyList = data;
       console.log(this.PropertyList);
       if(this.PropertyList.length == 0){
        this.isFound = false;
       }
     })

     
        
  }

}
