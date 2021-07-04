import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {


  constructor(private service:SharedService, private fb: FormBuilder) { }

  @Input() user:any;
  user_id:string;
  formUser: FormGroup;

  UserList:any=[];

  ErrorMessage:string = "";

  ngOnInit(): void {

    this.setForm();
    this.loadUserList();
  }

  loadUserList(){
    this.service.getPropertyList().subscribe((data:any)=>{
      
      this.UserList=data;

      this.formUser.patchValue({
        name:this.user.name,
        last_name:this.user.last_name,
        username:this.user.username,
        is_admin:this.user.is_admin
      });

      this.user_id = this.user.user_id;
    })
  }

  addUser(){
    let userExist:number;

    let user = {user_id:1,
      name:this.name,
      last_name:this.last_name,
      username:this.username,
      password:this.password,
      is_admin:this.is_admin
      }

      this.service.userExists(this.username).subscribe(async (data) =>{ //returns 0 if not exists
        userExist= await data;
       
    if (userExist == 0) {
      if (this.checkFields()) {
        this.service.signUpUser(user).subscribe(res => {
          alert(res.toString());
          this.setForm();
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

  updateUser(){
    var val = {user_id:this.user_id,
      name:this.name,
      last_name:this.last_name,
      username:this.username,
      password:this.password,
      is_admin:this.is_admin};

    this.service.updateUser(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  
  checkFields():boolean {
    return this.name != null ? true : false;
  }

  setForm(){

    this.formUser = this.fb.group({
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
        Validators.minLength(4)
      ]],
      is_admin: [false]
    })

  }
  


  get getControl(){
    return this.formUser.controls;
  }
    
  get name(){
    return this.formUser.get('name').value
  }

  get last_name(){
    return this.formUser.get('last_name').value
  }

  get username(){
    return this.formUser.get('username').value
  }

  get password(){
    return this.formUser.get('password').value
  }

  get is_admin(){
    return this.formUser.get('is_admin').value
  }

}

