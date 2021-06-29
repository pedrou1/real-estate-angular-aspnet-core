import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl= "http://localhost:46687/api";
  readonly PhotoUrl = "http://localhost:46687/ImagesUpload/";


  constructor(private http:HttpClient) {}

  //Department

  getPropertyList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Property');
  }

  addProperty(val:any){
    return this.http.post(this.APIUrl+'/Property', val)
  }

  updateProperty(val:any){
    return this.http.put(this.APIUrl+'/Property', val)
  }

  deleteProperty(val:any){
    return this.http.delete(this.APIUrl+'/Property/'+ val)
  }

  uploadImageProperty(val:any){
    return this.http.post(this.APIUrl+'/Property/SaveFile', val)
  }

  getPropertyById(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Property/'+val)
  }

  //User
  
  getUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee');
  }

  addUser(val:any){
    return this.http.post(this.APIUrl+'/User', val)
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl+'/User', val)
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl+'/User/'+ val)
  }

  uploadPhotoUser(val:any){
    return this.http.post(this.APIUrl+'/User/SaveFile', val)
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/User/GetAllDepartmentNames')
  }

  getEmployeeById(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/User/'+val)
  }

}
