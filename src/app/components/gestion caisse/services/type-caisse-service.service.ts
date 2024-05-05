import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TypeCaisseService{

  constructor(private http: HttpClient) { }


  getAllTypeCaisse(): Observable<any>
  {
      return this.http.get(environment.apiUrl+"/dg_TypeCaisse")
  }

  saveTypeCaisse(drp):  Observable<any>
  {
      return this.http.post(environment.apiUrl+"/dg_TypeCaisse",drp)
  }

  putTypeCaisse(drp): Observable<any>  
  {
      return this.http.put(environment.apiUrl+"/dg_TypeCaisse",drp)
  }
  
}
