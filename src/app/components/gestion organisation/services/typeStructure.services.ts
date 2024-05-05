import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class TypeStructureService
{
    constructor( private http: HttpClient)
    {
    }

    getAllTypeStructure(): Observable<any>
    {
        return this.http.get(environment.apiUrl+"/dg_TypeStructure")
    }

    saveTypeStructure(typeStructure):  Observable<any>
    {
        return this.http.post(environment.apiUrl+"/dg_TypeStructure",typeStructure)
    }

    putTypeStructure(typeStructure):  Observable<any>
    {
       // console.log(environment.apiUrl+"/dg_TypeStructure/"+typeStructure.id)
        return this.http.put(environment.apiUrl+"/dg_TypeStructure/"+typeStructure.id,typeStructure)
    }



}