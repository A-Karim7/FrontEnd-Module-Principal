import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Caisse } from 'src/app/models/caisse';
import { Structure } from 'src/app/models/structure';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CaisseService{
  constructor(private httpclient: HttpClient){}
  httpOptions =
  {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/JSON',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      })
  };

  private extractData(res: Response)
  {
      let body = res;
      return body || {};
  }

  private _caisseSubject = new Subject<void>();

  get caisseSubject()
  {
    return this._caisseSubject;
  }

  
  getAllCaisse():Observable<any>
  {
      return this.httpclient.get(environment.apiUrl+ '/dg_Caisse');
  }

  getAllStructure():Observable<Structure[]>
  {
      return this.httpclient.get<Structure[]>(environment.apiUrl+'/dg_Structure')
  }

  getAllTypeCaisse():Observable<any>
  {
      return this.httpclient.get(environment.apiUrl+ '/dg_TypeCaisse')
  }


  // getCaissebyStructure(idstructure)
  // {
  //   return this.httpclient.get(environment.apiUrl+'/dg_Caisse'+idstructure).pipe(map(this.extractData));
  // }
  getCaisse(id:number)
  {
    return this.httpclient.get(environment.apiUrl+'/dg_Caisse/'+id);
  }
  
  addCaisse(a:Caisse)
  {
    return this.httpclient.post(environment.apiUrl+'/dg_Caisse',a).pipe(
      tap(()=>{
        console.log("insertion avec success")
        this._caisseSubject.next();
      })
      ,catchError(err=> of([]))
    );
  }

   putCaisse(id:number,a:Caisse)
   {
     return this.httpclient.put(environment.apiUrl+'/dg_Caisse/'+id, a)
   .pipe(
      tap(()=>{
        console.log("modifier avec success")
        this._caisseSubject.next();
      })
      ,catchError(err=> of([]))
    );
  }

  deleteCaisse(id:number)
  {
    return this.httpclient.delete(environment.apiUrl+'/dg_Caisse/'+id).pipe(
      tap(()=>{
        this._caisseSubject.next();
      })
      ,catchError(err=> of([]))
    );
  }

  getUserByCaisse(histocaisseid){

    return this.httpclient.get(environment.apiUrl+'/dg_HistoriqueCaisse/caisse/'+histocaisseid);

  }
affecterCaisse(caisse, user)
{
  return this.httpclient.patch(environment.apiUrl+"/dg_Caisse/"+caisse.id+"/"+user.id+"/affectationCaisse",{}) 
}

cloturerCaisse(caisse)
{
  return this.httpclient.put(environment.apiUrl+"/dg_Caisse/clotureCaisse",caisse)
}

getDrpById(id: number)
{
  return this.httpclient.get(environment.apiUrl+"/dg_Drp/"+ id)
}

getCaissesByStructure(id){
  return this.httpclient.get(environment.apiUrl+"/dg_Caisse/structure/"+id)
}
getAllStructureAnnex(){
  return this.httpclient.get(environment.apiUrl+"/dg_StructureAnnexe")
}

}
