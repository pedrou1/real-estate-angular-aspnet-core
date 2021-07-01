import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/ilogin';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Username:string;
  Password:string;
  loginForm: FormGroup;  
  message: string;  
  returnUrl: string;
  ret:number;
  idusu;

  constructor(  
     private router: Router,
     private authService: AuthService,
     private sharedService:SharedService
  ) { }  
 
  ngOnInit() {
    this.Username = '';
    this.Password = '';
  }  
 
login() {  
  this.sharedService.userExists(this.Username).subscribe((async (data) =>{
  
  this.ret= await data;
  let user: ILogin = { username: this.Username, password: this.Password }

  if (this.ret > 0) {
    this.sharedService.signInUser(user).subscribe((async (data) => {   //returns 0 if password is 
    this.idusu = await data;
    if(this.idusu == 0){
      console.log("Contraseña incorrecta");
    }
    else{
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token', this.idusu);  //recargar a inicio sacar id de session y poner en navbar
      console.log(this.idusu);
      console.log("logeado");
      window.location.reload();
      window.location.replace('/user')
    }
    }))
  }
  else{
    console.log("usuario no existe");
  }
}))
    
     
 
 }  
 
}  