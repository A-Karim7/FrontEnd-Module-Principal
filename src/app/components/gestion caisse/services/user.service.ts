import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient) { }


  getAllUser(): Observable<any>
  {
      return this.http.get(environment.apiUrl+"/dg_User")
  }

  saveUser(user):  Observable<any>
  {
      return this.http.post(environment.apiUrl+"/dg_User",user)
  }

  putUser(user): Observable<any>  
  {
      return this.http.put(environment.apiUrl+"/dg_User",user)
  }
  
}
