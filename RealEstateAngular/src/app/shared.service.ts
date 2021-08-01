import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Iuser } from './authentication/interfaces/iuser';
import { ILogin } from './authentication/interfaces/ilogin';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl= "https://realestate.azurewebsites.net/api";
  readonly PhotoUrl = "https://realestate.azurewebsites.net/ImagesUpload/";
  readonly contactScript = "https://script.google.com/macros/s/AKfycbwMnqPm3OW0dg7CV-FQx5TxfNKlH3eoxz4GsA-KvQ/exec";


  constructor(private http:HttpClient) {}

  sendContactToEmail(val: any) {
    return this.http.post(this.contactScript, val, { responseType: 'text' }).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  //Property

  getPropertyList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Property');
  }

  addProperty(val:any){
    return this.http.post(this.APIUrl+'/Property', val);
  }

  updateProperty(val:any){
    return this.http.put(this.APIUrl+'/Property', val);
  }

  deleteProperty(val:any){
    return this.http.delete(this.APIUrl+'/Property/'+ val);
  }

  uploadImageProperty(val:any){
    return this.http.post(this.APIUrl+'/Property/SaveFile', val);
  }

  getPropertyById(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Property/'+val);
  }

  //User
  
  getUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/User');
  }

  signUpUser(val:Iuser){
    return this.http.post(this.APIUrl+'/User', val);
  }

  signInUser(val:ILogin):Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl+'/User/login', val);
  }

  userExists(username:string):Observable<any>{
    return this.http.get(this.APIUrl+'/User/Username/'+ username);
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl+'/User', val);
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl+'/User/'+ val);
  }

  getUserById(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/User/admin/'+val);
  }
  

}
