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
  ActiveAddEditUserComp:boolean=false; // show/hide component if editing or adding
  user:any;
  editingForm:boolean = true;


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
    this.editingForm = false;
  }

  closeClick(){
      this.ActiveAddEditUserComp=false;
      this.refreshUserList();
      this.editingForm = true;
      this.service.animateButton("");
  }

  editClick(item){
    this.user=item;
    this.ModalTitle= "Edit User";
    this.ActiveAddEditUserComp=true;
    this.editingForm = false;
  }

  deleteClick(item){
    if(confirm("Are you sure?")){
      this.service.deleteUser(item.user_id).subscribe(data=>{
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