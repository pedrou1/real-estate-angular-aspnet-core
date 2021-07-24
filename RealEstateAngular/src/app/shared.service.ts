import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Iuser } from './authentication/interfaces/iuser';
import { ILogin } from './authentication/interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl= "https://realestate.azurewebsites.net/api";
  readonly PhotoUrl = "https://realestate.azurewebsites.net/ImagesUpload/";

  
  cartItems = new BehaviorSubject([]); // has default value
  placeHolder = [];

  constructor(private http:HttpClient) {
    const localS = JSON.parse(localStorage.getItem('cart'));
    if(localS){                     
      this.cartItems.next(localS);   //push cart items to subject if empty
    }
  }

  addItem(property){

    let localS = JSON.parse(localStorage.getItem('cart'));
    let exists = -1;
    let qty = 1;

    if (localS != null) {               //check if property already on cart
      if (typeof localS === 'object' && localS.property_id == property.property_id) {
        exists = 0;
      }
      else {
        exists = localS.findIndex(x => x.property_id == property.property_id);
        
        //exists = localS.find((item) => {
        //  return item.property_id == property.property_id;
       // });
      }
    }
    
    if (exists != -1) {             //if it is already on cart update quantity
      //exists.qty++;
      //let foundIndex = localS.findIndex(x => x.property_id == property.property_id);
      localS[exists].qty++;
      this.setCart(localS);
    }
    else {                    //else add new property
      if (localS) {
        const newData = [...localS, property];
        this.setCart(newData);
        this.cartItems.next(JSON.parse(localStorage.getItem('cart')));
      }
      property.qty = qty;
      this.placeHolder.push(property);
      this.setCart(this.placeHolder);
    }
  }

  setCart(val):any{
    localStorage.setItem('cart', JSON.stringify(val));
    this.cartItems.next(this.getCart());
  }
  getCart(){
    return JSON.parse(localStorage.getItem('cart'));
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
