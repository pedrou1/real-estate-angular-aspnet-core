import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.css']
})
export class ShowPropertyComponent implements OnInit {

  constructor(private service:SharedService) { }

  PropertyList:any=[];
  ModalTitle:string;
  ActiveAddEditPropertyComp:boolean=false;
  property:any;


  ngOnInit(): void {
    this.refreshPropertyList();
  }

  addClick(){
    this.property={
      property_id:0,
      property_type:"",
      description:"",
      city:"",
      address:"",
      total_bedrooms:"",
      total_area_m2:"",
      photo_file_name:"noImage.jpg",
      price:""

    }
    this.ModalTitle="Add Property";
    this.ActiveAddEditPropertyComp=true;
  }

  closeClick(){
      this.ActiveAddEditPropertyComp=false;
      this.refreshPropertyList();
  }

  editClick(item){
    this.property=item;
    this.ModalTitle= "Edit Employee";
    this.ActiveAddEditPropertyComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure?')){
      this.service.deleteProperty(item.property_id).subscribe(data=>{
        alert(data.toString());
        this.refreshPropertyList();
      })
    }
  }

  refreshPropertyList(){
    this.service.getPropertyList().subscribe(data =>{
      this.PropertyList=data;
    })
  }

}