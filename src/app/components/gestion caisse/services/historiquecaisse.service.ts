import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueCaisseService{

  constructor(private http: HttpClient) { }


  getAllHistoriqueCaisse(): Observable<any>
  {
      return this.http.get(environment.apiUrl+"/dg_HistoriqueCaisse")
  }

  getAllHistoriqueCaisseByid(caisse)
  {
    return this.http.get(environment.apiUrl+"/dg_HistoriqueCaisse/caisse/"+caisse.id)
  }

  saveHistoriqueCaisse(Historique):  Observable<any>
  {
      return this.http.post(environment.apiUrl+"/dg_HistoriqueCaisse",Historique)
  }

  putHistoriqueCaisse(Historique): Observable<any>  
  {
      return this.http.put(environment.apiUrl+"/dg_HistoriqueCaisse",Historique)
  }
  
}
