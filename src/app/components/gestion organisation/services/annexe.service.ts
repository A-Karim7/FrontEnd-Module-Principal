import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StructureAnnexeService {

constructor(private http: HttpClient) { }


getAllStructureAnnexe(): Observable<any>
{
    return this.http.get(environment.apiUrl+"/dg_StructureAnnexe")
}

saveStructureAnnexe(structureannexe):  Observable<any>
{
    return this.http.post(environment.apiUrl+"/dg_StructureAnnexe",structureannexe)
}

putStructureAnnexe(structureannexe):  Observable<any>
{
    return this.http.put(environment.apiUrl+"/dg_StructureAnnexe",structureannexe)
}
}


