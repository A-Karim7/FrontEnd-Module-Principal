import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Drp } from "src/app/models/drp";
import { Structure } from "src/app/models/structure";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";


@Component({
    selector: 'app-structures',
    template: `<div class="structures-content">
            <div class="card">
                               <h3 class="bg-gray-200 p-3" >{{this.sauvegarde.Drp_Information.libelle}}</h3>
                                    <div class="p-fluid">
                                        <p-autoComplete placeholder="Choisir un bureau" id="structures" [dropdown]="true" [multiple]="false" [suggestions]="filteredstructures" (completeMethod)="filterStructures($event)" field="libelle" [(ngModel)]="structure" ></p-autoComplete>
                                        <small *ngIf="(submitted)" class="p-error">Selectionnez une structure.</small>

                                    </div>
<br><br>
                <div class="p-formgrid grid">
                    <div class="col-md-2 mr-auto">
                        <p-button label="Précèdent" (onClick)="prevPage()" icon="pi pi-angle-left" iconPos="left" class="p-toolbar-group-right"></p-button>
                    </div>
                    <div class="col-md-1" style="margin-right:10px;">
                        <p-button label="Suivant" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right" class="p-toolbar-group-right"></p-button>
                    </div>
                </div>

            </div>
    </div>`,
})


export class StructuresComponent implements OnInit {
    submitted: boolean = false;
    structures: Structure[];
    structure: Structure;
    filteredstructures: Structure[];
    StructureInformation: Structure[];
    drp: Drp;
    utilisateur:Users;
    memo: number;
    listRoles
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router,private keycloakservice: KeycloakService) { }

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles;
        if(this.sauvegarde.Users_Information && this.sauvegarde.Drp_Information){
            this.drp=this.sauvegarde.Drp_Information;
            this.utilisateur=this.sauvegarde.Users_Information;
        }
        else{
            this.router.navigate(['/OtherUsers/Drp']);
        }
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.structures=data;
                this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
                this.filtre()
            }
        );
    }
    filterStructures(event) {
        const filtered: Structure[] = [];
        const query = event.query;
        for (let w = 0; w < this.structures.length; w++) {
            const struc = this.structures[w];
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
            this.structures = this.structures.filter(use => use.dg_drp.id === this.drp.id && use.dg_typeStructure.libelle === 'Bureau');
            //this.structures = this.structures.filter(use => use.id === this.drp.id);
        }
        else if(this.findRole(['ROLE_DRP'])==true){
            this.structures = this.structures.filter(use => use.id === this.utilisateur.dg_structure.id);
        }
        else if(this.findRole(['ROLE_RECEVEUR'])==true){
            this.structures = this.structures.filter(use => use.id === this.utilisateur.dg_structure.id);
            console.log(this.structures)
        }
        else if(this.findRole(['ROLE_GRANDECAISSE','ROLE_RESPONSABLE_ANNEXE'])==true){
            this.structures = this.structures.filter(use => use.id === this.utilisateur.dg_structure.id);
        }
        else{
            this.organisationService.getAllDirections().subscribe(
                (data)=>{
                    this.structures=data;
                }
            )
        }
    }
    prevPage() {
        this.router.navigate(['/OtherUsers/Drp']);
    }
    nextPage() {
        if (this.structures) {
            this.sauvegarde.Structure_Information = this.structure;
            if(!this.sauvegarde.Structure_Information){
                this.submitted = true;
            }
            else{
                this.router.navigate(['/OtherUsers/users']);
            }
            return;
        }
        this.submitted = true;
    }
}
