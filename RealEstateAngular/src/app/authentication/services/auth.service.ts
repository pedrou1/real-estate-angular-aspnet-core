import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor() { 
   
  }

  updateNavbar(){
    const authenticated = !!JSON.parse(localStorage.getItem('isLoggedIn')); 
    const isAdmin = !!JSON.parse(localStorage.getItem('isAdmin')); 
    this.isAuthenticated.next(authenticated);
    this.isAdmin.next(isAdmin);
  }

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.setItem('isAdmin','false');  
    localStorage.removeItem('token'); 
  }
}
