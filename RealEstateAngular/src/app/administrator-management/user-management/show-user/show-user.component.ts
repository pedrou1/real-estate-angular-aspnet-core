import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor(private service:SharedService) { }

  UserList:any=[];
  ModalTitle:string;
  ActiveAddEditUserComp:boolean=false;
  user:any;


  ngOnInit(): void {
    this.refreshUserList();
  }

  addClick(){
    this.user={
      user_id:0,
      name:"",
      last_name:"",
      username:"",
      is_admin:""

    }
    this.ModalTitle="Add User";
    this.ActiveAddEditUserComp=true;
  }

  closeClick(){
      this.ActiveAddEditUserComp=false;
      this.refreshUserList();
  }

  editClick(item){
    this.user=item;
    this.ModalTitle= "Edit User";
    this.ActiveAddEditUserComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure?')){
      this.service.deleteUser(item.property_id).subscribe(data=>{
        alert(data.toString());
        this.refreshUserList();
      })
    }
  }

  refreshUserList(){
    this.service.getUserList().subscribe(data =>{
      this.UserList=data;
    })
  }

}