import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { Validators } from '@angular/forms'; 

@Component({
  selector: 'app-add-edit-property',
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.css']
})
export class AddEditPropertyComponent implements OnInit {

 
  constructor(private service:SharedService) { }

  @Input() property:any;
  property_id:string;
  property_type:string;
  description:string;
  city:string;
  address:string;
  total_bedrooms:string;
  total_area_m2:string;
  price:string;
  photo_file_name:string;
  photo_file_path:string;

  PropertyList:any=[];

  ErrorMessage:string = "";

  ngOnInit(): void {
    this.loadPropertyList();
  }

  loadPropertyList(){
    this.service.getPropertyList().subscribe((data:any)=>{
      this.PropertyList=data;
      this.property_id = this.property.property_id;
      this.property_type = this.property.property_type;
      this.description = this.property.description;
      this.city = this.property.city;
      this.address = this.property.address;
      this.total_bedrooms = this.property.total_bedrooms;
      this.total_area_m2 = this.property.total_area_m2;
      this.price = this.property.price;
      this.photo_file_name = this.property.photo_file_name;
      this.photo_file_path = this.service.PhotoUrl+this.photo_file_name;
    })
  }

  addProperty(){
    var val = {property_id:this.property_id,
      property_type:this.property_type,
      description:this.description,
      city:this.city,
      address:this.address,
      total_bedrooms:this.total_bedrooms,
      total_area_m2:this.total_area_m2,
      price:this.price,
      photo_file_name:this.photo_file_name};

      if (this.checkFields()) {
        this.service.addProperty(val).subscribe(res => {
          alert(res.toString());
        });
      }
      else {
        this.ErrorMessage = "Name invalid";
      }
    }

  updateProperty(){
    var val = {property_id:this.property_id,
      property_type:this.property_type,
      description:this.description,
      city:this.city,
      address:this.address,
      total_bedrooms:this.total_bedrooms,
      total_area_m2:this.total_area_m2,
      price:this.price,
      photo_file_name:this.photo_file_name};

    this.service.updateProperty(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadImage(event){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file,file.name);

    this.service.uploadImageProperty(formData).subscribe((data:any)=>{
      this.photo_file_name = data.toString();
      this.photo_file_path = this.service.PhotoUrl+this.photo_file_name;
    });
  }

  
  checkFields():boolean {
    return this.property_type != null ? true : false;
  }
}

