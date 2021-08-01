import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private sharedService:SharedService,private fb: FormBuilder) { }

  formContact: FormGroup;
  
  ErrorMessage:string = "";
  hasMessage: boolean = false;
  hasError:boolean = true;

  ngOnInit(): void {
    this.setForm();
  }
  

  submit() {

    var formData: any = new FormData();
    formData.append("name", this.name);
    formData.append("email", this.email);
    formData.append("message", this.message);

    this.sharedService.sendContactToEmail(formData).subscribe(response => {
      this.ErrorMessage = "Sent successfully!";
      this.hasError = false;
    }, error => {
      this.ErrorMessage = "An error has ocurred.";
    })
    this.hasMessage = true;
  }

  checkFields():boolean {
    return this.name != null ? true : false;
  }

  setForm(){
    this.formContact = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      message: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    })
  }

  get getControl(){
    return this.formContact.controls;
  }
    
  get name(){
    return this.formContact.get('name').value
  }

  get email(){
    return this.formContact.get('email').value
  }

  get message(){
    return this.formContact.get('message').value
  }
}

