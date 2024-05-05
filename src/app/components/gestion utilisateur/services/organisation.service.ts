import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Directions } from "src/app/models/directions";
import { Drp } from "src/app/models/drp";
import { Fonctions } from "src/app/models/fonctions";
import { Modif } from "src/app/models/modif";
import { Roles } from "src/app/models/roles";
import { Structure } from "src/app/models/structure";
import { StructureAnnexe } from "src/app/models/structureAnnexe";
import { Users } from "src/app/models/users";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn:'root'
})

export class OrganisationService{
    constructor(private http: HttpClient) {
    }
    User:Modif;
    getAllDirections(): Observable<Structure[]>{
        return this.http.get<Structure[]>(environment.apiUrl+'/dg_Structure');
    }
    getAllModif(): Observable<Modif[]>{
        return this.http.get<Modif[]>(environment.apiUrl+'/dg_HistoriqueUser');
    }
    getModifUser(id: number): Observable<Modif>{
        return this.http.get<Modif>(environment.apiUrl+'/dg_HistoriqueUser/user/'+id);
    }
    getAllUsers(): Observable<Users[]>{
        return this.http.get<Users[]>(environment.apiUrl+'/dg_User');
    }
    getAllUsersId(id:number): Observable<Users>{
        return this.http.get<Users>(environment.apiUrl+'/dg_User/'+id);
    }
    getAllDirectionsId(id:number): Observable<Structure>{
        return this.http.get<Structure>(environment.apiUrl+'/dg_Structure/'+id);
    }
    getAllUsersEmail(mail:string): Observable<Users>{
        return this.http.get<Users>(environment.apiUrl+'/dg_User/email/'+mail);
    }
    getAllUser(): Observable<Users>{
        return this.http.get<Users>('assets/demo/data/dg_User.json');
    }
    getAllFonctions(): Observable<Fonctions[]>{
        return this.http.get<Fonctions[]>(environment.apiUrl+'/dg_Fonction/findall');
    }
    getAllRoles(): Observable<Roles[]>{
        return this.http.get<Roles[]>(environment.apiUrl+'/dg_Role/all');
    }
    getAllDRP(): Observable<Drp[]>{
        return this.http.get<Drp[]>(environment.apiUrl+'/dg_Drp');
    }
    getAllAnnexes(): Observable<StructureAnnexe[]>{
        return this.http.get<StructureAnnexe[]>(environment.apiUrl+'/dg_StructureAnnexe');
    }

}
