import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Processus } from "src/app/models/processus"
import { Produit } from "src/app/models/produit";
import { environment } from "src/environments/environment.prod"

@Injectable()
export class ProcessusService
{
    constructor( private http: HttpClient)
    {
    }
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

    getAllprocessus()
    {
        return this.http.get(environment.apiUrl+"/dg_Processus?")
    }

    saveprocessus(processus: Processus)
    {
        return this.http.post(environment.apiUrl+"/dg_Processus",processus)
    }

    putprocessus(processus)
    {
        return this.http.put(environment.apiUrl+"/dg_Processus/",processus)
    }


    getProcessusById(id:number){
        return this.http.get(environment.apiUrl+'/dg_ProduitAnaProcessus/test1/'+id)
    }
    
    getProduitById(id:number){
        return this.http.get(environment.apiUrl+'/dg_ProduitAnaProcessus/test0/'+id)
    }
    getProcessus(id:number){
        return this.http.get(environment.apiUrl+'/dg_Processus/'+id)
    }
    
    saveProcessusByIdProd(id,list:Processus[]){
    return this.http.post(environment.apiUrl+'/dg_ProduitAnaProcessus/GroupProduitToProcessus/'+id,list);
    }
    deleteProduit(id, idproduit){
        return this.http.delete(environment.apiUrl+'/dg_ProduitAnaProcessus/testp/'+id+'/'+idproduit)
    }
    
//   saveProcessusAndProduit(){
//     // return this.http.get(environment.apiUrl+'/dg_ProduitAnaProcessusId/'+id)
//     return this.http.get(environment.apiUrl+'/GroupProduitToProcessus/')
//    }

saveProduitByIdProcessus(id,list:Produit[]){
    return this.http.post(environment.apiUrl+'/dg_ProduitAnaProcessus/GroupProcessusToProduit/'+id,list);
    }
    
}