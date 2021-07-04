import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { ILogin } from '../../interfaces/ilogin';
import { SharedService } from 'src/app/shared.service';
import { IloginOut } from '../../interfaces/ilogin-out';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;  
  message: string;
  ret:number;
  userOut:IloginOut[];
  ErrorMessage:string = "";

  constructor(  
     private router: Router,
     private sharedService:SharedService,
     private fb: FormBuilder
  ) { }  
 
  ngOnInit() {
    this.formLogin = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })

    if(localStorage.getItem('isAdmin') == 'true'){
      this.router.navigate(['administrator-management']);
    }
    else if(localStorage.getItem('isLoggedIn') == 'true'){
     this.router.navigate(['home']);
    }
  }

  get getControl(){
    return this.formLogin.controls;
  }
    
  get username(){
    return this.formLogin.get('username').value
  }

  get password(){
    return this.formLogin.get('password').value
  }
 
  login() {
    this.sharedService.userExists(this.username).subscribe((async (data) => {

      this.ret = await data;
      let user: ILogin = { username: this.username, password: this.password }

      if (this.ret > 0) {
        this.sharedService.signInUser(user).subscribe((async (data) => {   //returns 0 if password is wrong
          this.userOut = await data;

          var jsonUser = JSON.parse(JSON.stringify(this.userOut));

          if (jsonUser.user_id > 0) {

            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('token', jsonUser.user_id.toString());
            localStorage.setItem('isAdmin', '' + jsonUser.is_admin.toLowerCase());

            if (localStorage.getItem('isAdmin') == 'true'){
              this.router.navigate(['administrator-management']);
            }
            else{
              this.router.navigate(['home']);
            }
          }
          else {
            this.ErrorMessage = "Incorrect password";
          }
        }))
      }
      else {
        this.ErrorMessage = "User does not exist";
      }
    }))
  }
 
}  