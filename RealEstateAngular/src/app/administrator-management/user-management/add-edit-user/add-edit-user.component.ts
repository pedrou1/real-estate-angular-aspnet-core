import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {


  constructor(private service: SharedService) { }

  @Input() user: any;
  user_id: string;
  name: string;
  last_name: string;
  username: string;
  is_admin: string;

  UserList: any = [];


  ngOnInit(): void {

  }

}

