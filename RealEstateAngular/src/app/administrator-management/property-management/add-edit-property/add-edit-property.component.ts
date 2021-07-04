import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-property',
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.css']
})
export class AddEditPropertyComponent implements OnInit {

 
  constructor(private service:SharedService, private fb: FormBuilder) { }

  @Input() property:any;
  property_id:string;
  photo_file_name:string;
  photo_file_path:string;
  formProperty: FormGroup;

  PropertyList:any=[];

  ErrorMessage:string = "";

  ngOnInit(): void {

    this.setForm();
    this.loadPropertyList();
  }

  loadPropertyList(){
    this.service.getPropertyList().subscribe((data:any)=>{
      
      this.PropertyList=data;

      this.formProperty.patchValue({
        property_type: this.property.property_type, 
        description: this.property.description, 
        city: this.property.city, 
        address: this.property.address, 
        total_bedrooms: this.property.total_bedrooms, 
        total_area_m2: this.property.total_area_m2, 
        price: this.property.price
      });

      this.property_id = this.property.property_id;
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
          this.setForm();
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

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  setForm(){

    this.formProperty = this.fb.group({
      property_type: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      total_bedrooms: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      total_area_m2: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      price: ['', [
        Validators.required,
        Validators.minLength(2)
      ]]
    })

  }
  
  get getControl(){
    return this.formProperty.controls;
  }
    
  get property_type(){
    return this.formProperty.get('property_type').value
  }

  get description(){
    return this.formProperty.get('description').value
  }

  get city(){
    return this.formProperty.get('city').value
  }

  get address(){
    return this.formProperty.get('address').value
  }

  get total_bedrooms(){
    return this.formProperty.get('total_bedrooms').value
  }
  
  get total_area_m2(){
    return this.formProperty.get('total_area_m2').value
  }

  get price(){
    return this.formProperty.get('price').value
  }
}

