import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class StructureService
{
    constructor( private http: HttpClient)
    {
    }

    getAllStructure()
    {
        return this.http.get(environment.apiUrl+"/dg_Structure")
    }

    getStructure(id)
    {
        return this.http.get(environment.apiUrl+"/dg_Structure/"+id)
    }

    saveStructure(structure)
    {
        return this.http.post(environment.apiUrl+"/dg_Structure",structure)
    }

    putStructure(structure)
    {
        return this.http.put(environment.apiUrl+"/dg_Structure",structure)
    }
}