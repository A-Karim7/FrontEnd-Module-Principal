import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produit } from "src/app/models/produit";
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class ProduitService
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

    getAllProduit()
    {
        return this.http.get(environment.apiUrl+"/dg_ProduitAna")
    }

    saveProduit(produit: Produit)
    {
        return this.http.post(environment.apiUrl+"/dg_ProduitAna/",produit)
    }

    putProduit(produit)
    {
        return this.http.put(environment.apiUrl+'/dg_ProduitAna/',produit)
    }
    
  saveProcessusAndProduit(){
   // return this.http.get(environment.apiUrl+'/dg_ProduitAnaProcessusId/'+id)
   return this.http.get(environment.apiUrl+'/GroupProduitToProcessus/')
  }
  AllTypeProduit(){
    return this.http.get(environment.apiUrl+'/dg_TypeProduit')
  }
  getProduit(id:number){
    return this.http.get(environment.apiUrl+'/dg_ProduitAna/'+id)
}

}