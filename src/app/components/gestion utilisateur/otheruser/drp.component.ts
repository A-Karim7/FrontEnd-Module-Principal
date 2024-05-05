import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Drp } from "src/app/models/drp";
import { Structure } from "src/app/models/structure";
import { Users } from "src/app/models/users";

import { OrganisationService } from "../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
    selector: 'app-drp',
    template: `<div class="drp-content">
            <div class="card">
                               <h3 class="bg-gray-200 p-3" >Directions Régionales des postes</h3>
                                    <div class="p-fluid">
                                        <p-autoComplete placeholder="Choisir une Drp" id="drp" [dropdown]="true" [multiple]="false" [suggestions]="filteredstructures" (completeMethod)="filterStructures($event)" field="libelle" [(ngModel)]="drp" ></p-autoComplete>
                                        <small *ngIf="(submitted)" class="p-error">Selectionnez une Drp.</small>

                                    </div>
<br><br>
                <div class="grid grid-nogutter justify-content-end">
                                <p-button label="Suivant" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                            </div>

            </div>
    </div>`,
})


export class DrpComponent implements OnInit {
    submitted: boolean = false;
    drps: Drp[];
    drp: Drp;
    filteredstructures: Structure[];
    StructureInformation: Structure[];
    utilisateur:Users;
    memo: number;
    listRoles
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router,private keycloakservice: KeycloakService) { }

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        this.organisationService.getAllUsersEmail(this.keycloakservice.getKeycloakInstance().profile.username).subscribe(
            (data)=>{
                this.utilisateur=data;
                console.log(this.utilisateur)
            }
        );
        this.organisationService.getAllDRP().subscribe(
            (data)=>{
                this.drps=data;
                this.drps = this.drps.filter(use => use.libelle !== "SERVICES CENTRAUX");
                this.filtre()
            }
        );
    }
    filterStructures(event) {
        const filtered: Structure[] = [];
        const query = event.query;
        for (let w = 0; w < this.drps.length; w++) {
            const struc = this.drps[w];
            if (struc.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(struc);
            }
        }
        this.filteredstructures = filtered;
    }
    findRole(listrole) {
        let retour = false
        for (let rol1 of listrole) {

            if (this.listRoles.find(role => role === rol1) != undefined) {
                retour = true
            }
        }
        return retour
    }
    filtre(){
        if(this.findRole(['ROLE_DER'])==true){
        }
        else if(this.findRole(['ROLE_DRP'])==true){
            this.drps = this.drps.filter(use => use.id === this.utilisateur.dg_structure.dg_drp.id);
        }
        else if(this.findRole(['ROLE_RECEVEUR'])==true){
            this.drps = this.drps.filter(use => use.id === this.utilisateur.dg_structure.dg_drp.id);
        }
        else if(this.findRole(['ROLE_GRANDECAISSE','ROLE_RESPONSABLE_ANNEXE'])==true){
            this.drps = this.drps.filter(use => use.id === this.utilisateur.dg_structure.dg_drp.id);
        }
        else{
        }
        this.drps.sort((a,b) => a.libelle.localeCompare(b.libelle));
    }
    nextPage() {
        if (this.drp) {
            this.sauvegarde.DrpInformation = this.drps;
            this.sauvegarde.Drp_Information = this.drp;
            this.sauvegarde.Users_Information = this.utilisateur;
            if(!this.sauvegarde.Drp_Information){
                this.submitted = true;
            }
            else{
                this.router.navigate(['/OtherUsers/structures']);
            }
            return;
        }
        this.submitted = true;
    }
}
