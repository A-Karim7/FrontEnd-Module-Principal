import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { MenuItem } from "primeng/api";
import { Drp } from "src/app/models/drp";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
  selector: 'app-structure-users',
  templateUrl: './structure-users.component.html',
  styleUrls: ['./structure-users.component.scss']
})
export class StructureUsersComponent implements OnInit {
    items: MenuItem[];
    items1: MenuItem[];
    items2: MenuItem[];
    items3: MenuItem[];
    utilisateur: Users;
    drps: Drp[];
    listRoles;
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService ,private keycloakservice: KeycloakService, private router: Router) { }

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        this.organisationService.getAllUsersEmail(this.keycloakservice.getKeycloakInstance().profile.username).subscribe(
            (data)=>{
                this.utilisateur=data;
                this.sauvegarde.Users_Information=this.utilisateur;
                console.log(this.utilisateur)
            }
        );
        this.organisationService.getAllDRP().subscribe(
            (data)=>{
                this.drps=data;
                this.drps = this.drps.filter(use => use.libelle !== "SERVICES CENTRAUX");
            }
        );
        this.items = [
            {label: 'Drp', routerLink: 'Drp'},
            {label: 'Structures', routerLink: 'structures'},
            {label: 'Utilisateurs', routerLink: 'users'},
        ];
        this.items1 = [
            {label: 'Drp1', routerLink: 'Drp_der'},
            {label: 'Utilisateurs', routerLink: 'users_der'},
        ];
        this.items2 = [
            {label: 'Structures', routerLink: 'structures_drp'},
            {label: 'Utilisateurs', routerLink: 'users_drp'},
        ];
        this.items3 = [
            {label: 'Structures', routerLink: 'structures'},
            {label: 'Utilisateurs', routerLink: 'users'},
        ];
        this.items3 = [
            {label: 'Utilisateurs', routerLink: 'users'},
        ];
        this.filtre();
        console.log(this.items)
    }
    filtre(){
        if(this.findRole(['ROLE_DER'])==true){
            this.items = this.items1;
        }
        else if(this.findRole(['ROLE_DRP'])==true){
            this.items = this.items2;
        }
        else if(this.findRole(['ROLE_RECEVEUR', 'ROLE_GRANDECAISSE'])==true){
            this.items = this.items2;
        }
        else if(this.findRole(['ROLE_RESPONSABLE_ANNEXE'])==true){
            this.items = this.items2;
        }
    }/*
    filtrebis(){
        if(this.findRole(['ROLE_DRP'])==true){
            this.drps = this.drps.filter(use => use.id === this.utilisateur.dg_structure.dg_drp.id);
            this.sauvegarde.Drp_Information=this.drps[0];
            this.sauvegarde.Users_Information=this.utilisateur;
            console.log(this.sauvegarde.Drp_Information)
            console.log(this.sauvegarde.Users_Information)
            this.items = this.items2;
            this.router.navigate(['/StructuresUsers/structures']);

        }
    }*/
    findRole(listrole) {
        let retour = false
        for (let rol1 of listrole) {
            if (this.listRoles.find(role => role === rol1) != undefined) {
                retour = true
            }
        }
        return retour
    }
}
