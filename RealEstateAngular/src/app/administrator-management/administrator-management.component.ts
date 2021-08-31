import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-administrator-management',
  templateUrl: './administrator-management.component.html',
  styleUrls: ['./administrator-management.component.css']
})
export class AdministratorManagementComponent implements OnInit {

  manageUsers:boolean;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.openPropertiesManagement();
  }

  openPropertiesManagement(){
    this.service.animateButton("Prop");
    this.manageUsers = false;
  }
  openUserManagement(){
    this.service.animateButton("Usr");
    this.manageUsers = true;
  }
}
