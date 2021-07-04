import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sharedService:SharedService,private router: Router,private fb: FormBuilder) { }

  formRegister: FormGroup;
  ret;
  
  
  ErrorMessage:string = "";

  ngOnInit(): void {

    this.setForm();

    if(localStorage.getItem('isLoggedIn') == 'true'){
      this.router.navigate(['home']);
    }
  }
  

  signUp(){
    let user: Iuser = {user_id:1,
      name:this.name,
      last_name:this.last_name,
      username:this.username,
      password:this.password,
      is_admin:false
      };

      this.sharedService.userExists(this.username).subscribe(async (data) =>{ //returns 0 if not exists
        this.ret= await data;
       
    if (this.ret == 0) {
      if (this.checkFields()) {
        this.sharedService.signUpUser(user).subscribe(res => {
          alert(res.toString());
        });
        this.ErrorMessage = "Success"
        this.setForm();
      }
      else {
        this.ErrorMessage = "Name invalid";
      }
    }
    else {
      this.ErrorMessage = "Username is already taken"
    }
  })
    }

  checkFields():boolean {
    return this.name != null ? true : false;
  }

  setForm(){
    this.formRegister = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      last_name: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })
  }

  get getControl(){
    return this.formRegister.controls;
  }
    
  get name(){
    return this.formRegister.get('name').value
  }

  get last_name(){
    return this.formRegister.get('last_name').value
  }

  get username(){
    return this.formRegister.get('username').value
  }

  get password(){
    return this.formRegister.get('password').value
  }
  
}

