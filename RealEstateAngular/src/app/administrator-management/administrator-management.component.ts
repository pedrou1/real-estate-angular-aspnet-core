import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-management',
  templateUrl: './administrator-management.component.html',
  styleUrls: ['./administrator-management.component.css']
})
export class AdministratorManagementComponent implements OnInit {

  manageUsers:boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.openPropertiesManagement();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  openPropertiesManagement(){
    this.manageUsers = false;
  }
  openUserManagement(){
    this.manageUsers = true;
  }

}
