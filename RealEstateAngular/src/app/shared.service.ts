import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Iuser } from './authentication/interfaces/iuser';
import { ILogin } from './authentication/interfaces/ilogin';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl= "https://realestate.azurewebsites.net/api";
  readonly PhotoUrl = "https://realestate.azurewebsites.net/api/";
  readonly contactScript = "https://script.google.com/macros/s/AKfycbwMnqPm3OW0dg7CV-FQx5TxfNKlH3eoxz4GsA-KvQ/exec";

  favItems = new BehaviorSubject([]);


  constructor(private http:HttpClient) {
    const localS = JSON.parse(localStorage.getItem('favs'));
    if(localS){                     
      this.favItems.next(localS);   //push fav items to subject if empty
    }
  }

  setFavs(val):any {
    localStorage.setItem('favs', JSON.stringify(val));
    this.favItems.next(this.getFav());
  }

  getFav() {
    return JSON.parse(localStorage.getItem('favs'));
  }

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
  
  animateButton(type:string){
    const element = document.querySelector('#animatebutton'+type);
    element.classList.add('animated', 'bounceIn');
    setTimeout(function () {
      element.classList.remove('bounceIn');
    }, 1000);

  }

  addItem(property) {

    let localS = JSON.parse(localStorage.getItem('favs'));
    let exists: boolean = false;

    if (localS != null) {  //check if property already on favs
      if (typeof localS === 'object' && localS.property_id == property.property_id) {
        exists = true;
      }
      else {
        localS.find((item) => {
          if (item.property_id == property.property_id) exists = true;
        });
      }
    }
    if (exists == false) {
      if (localS != null) {
        const newData = [...localS, property];
        this.setFavs(newData);
      }
      else {
        let placeHolder = [];
        placeHolder.push(property);
        this.setFavs(placeHolder);
      }
    }
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
