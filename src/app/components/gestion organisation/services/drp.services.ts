import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class DrpService
{
    constructor( private http: HttpClient)
    {
    }

    getAllDrp()
    {
        return this.http.get(environment.apiUrl+"/dg_Drp")
    }

    saveDrp(drp)
    {
        return this.http.post(environment.apiUrl+"/dg_Drp",drp)
    }

    putDrp(drp)
    {
        return this.http.put(environment.apiUrl+"/dg_Drp",drp)
    }
}