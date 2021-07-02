import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }   
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedInAdmin()) {      
        return true;      
        }
           // navigate to login page if user is not authenticated    
        this.router.navigate(['/login']);
        return false;      
  }
  public isLoggedInAdmin(): boolean {      
    let isAdmin = false;      
    if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('isAdmin') == "true") {      
      isAdmin = true;      
    }    
    else {      
      isAdmin = false;      
       }      
    return isAdmin;      
    }    
  
}
