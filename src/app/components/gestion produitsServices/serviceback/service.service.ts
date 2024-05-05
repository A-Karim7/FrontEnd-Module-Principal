import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Service } from "src/app/models/service"
import { environment } from "src/environments/environment.prod"

@Injectable()
export class ServiceService
{
    constructor( private http: HttpClient)
    {
    }

    getAllService()
    {
        return this.http.get(environment.apiUrl+"/dg_Services?_embed=produitserviceassociations")
    }

    saveService(service: Service)
    {
        return this.http.post(environment.apiUrl+"/dg_Services",service)
    }

    putService(id,service)
    {
        return this.http.put(environment.apiUrl+"/dg_Services/"+id,service)
    }
}