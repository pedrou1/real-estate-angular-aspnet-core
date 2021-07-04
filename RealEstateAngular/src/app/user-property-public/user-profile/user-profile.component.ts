import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:any[] = [ {user:"", } ];

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('token');

    this.service.getUserById(id).subscribe(data=>{
      this.user = data;
      this.user[0].date_of_joining = this.user[0].date_of_joining.substring(0, 10)
    });

    
  }

}
