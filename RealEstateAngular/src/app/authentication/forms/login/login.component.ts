import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/ilogin';
import { SharedService } from 'src/app/shared.service';
import { IloginOut } from '../../interfaces/ilogin-out';

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
  userOut:IloginOut[];

  constructor(  
     private router: Router,
     private sharedService:SharedService
  ) { }  
 
  ngOnInit() {
    this.Username = '';
    this.Password = '';
    if(localStorage.getItem('isAdmin') == 'true'){
      this.router.navigate(['administrator-management']);
    }
    else if(localStorage.getItem('isLoggedIn') == 'true'){
     this.router.navigate(['home']);
    }
    
  }  
 
login() {  
  this.sharedService.userExists(this.Username).subscribe((async (data) =>{
  
  this.ret= await data;
  let user: ILogin = { username: this.Username, password: this.Password }

  if (this.ret > 0) 
  {
    this.sharedService.signInUser(user).subscribe((async (data) => {   //returns 0 if password is wrong
    this.userOut = await data;

    var jsonUser = JSON.parse(JSON.stringify(this.userOut));
    
    if(jsonUser.user_id == 0)
    {
      console.log("Contraseña incorrecta");
    }
    else
    {
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token', jsonUser.user_id.toString());  //recargar a inicio sacar id de session y poner en navbar
      console.log("logeado");
      localStorage.setItem('isAdmin', ''+ jsonUser.is_admin.toLowerCase());
      if(jsonUser.is_admin == 'True'){
        window.location.reload();
      }
      this.router.navigate(['ministrator-management']);
      
      
      //window.location.reload();
    }
    }))
  }
  else{
    console.log("usuario no existe");
  }
}))
    
     
 
 }  
 
}  