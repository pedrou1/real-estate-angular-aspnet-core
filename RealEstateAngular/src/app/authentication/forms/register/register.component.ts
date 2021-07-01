import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  name:string;
  last_name:string;
  username:string;
  password:string;
  is_admin:boolean;
  ret;
  
  ErrorMessage:string = "";

  ngOnInit(): void {
  }

  signUp(){
    let user: Iuser = {user_id:1,
      name:this.name,
      last_name:this.last_name,
      username:this.username,
      password:this.password,
      is_admin:this.is_admin
      };

      this.sharedService.userExists(this.username).subscribe((data) =>{
        this.ret=data;
      }) //returns 0 if not exists
      console.log(this.ret)

      if (this.checkFields()) {
        this.sharedService.signUpUser(user).subscribe(res => {
          alert(res.toString());
        });
      }
      else {
        this.ErrorMessage = "Name invalid";
      }
    }

  checkFields():boolean {
    return this.name != null ? true : false;
  }
  
}

