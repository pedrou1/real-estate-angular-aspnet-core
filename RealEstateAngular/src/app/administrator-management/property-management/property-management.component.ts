import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css']
})
export class PropertyManagementComponent implements OnInit {

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
      PropertyId:0,
      PropertyName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.jpeg"
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
      this.service.deleteProperty(item.PropertyId).subscribe(data=>{
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