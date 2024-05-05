import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Drp } from "src/app/models/drp";
import { Structure } from "src/app/models/structure";
import { OrganisationService } from "../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
    selector: 'app-structures',
    template: `<div class="structures-content">
            <div class="card">
                                <h2>{{this.sauvegarde.Drp_Information.libelle}}</h2>
                                    <div class="p-fluid">
                                        <p-autoComplete placeholder="Choisir un bureau" id="structures" [dropdown]="true" [multiple]="false" [suggestions]="filteredstructures" (completeMethod)="filterStructures($event)" field="libelle" [(ngModel)]="structure" ></p-autoComplete>
                                        <small *ngIf="(submitted)" class="p-error">Selectionnez une structure.</small>

                                    </div>
<br><br>
                <div class="p-formgrid grid">
                    <div class="col-md-2 mr-auto">
                        <p-button label="Précèdent" (onClick)="prevPage()" icon="pi pi-angle-left" iconPos="left"  class="p-button-outlined p-button-primary mr-2 mb-2"></p-button>
                    </div>
                    <div class="col-md-1" style="margin-right:10px;">
                        <p-button label="Suivant" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right" class="p-button-outlined p-button-primary mr-2 mb-2"></p-button>
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
    drp: Drp;
    listRoles
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router,private keycloakservice: KeycloakService) { }

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles;
        if(this.sauvegarde.Users_Information && this.sauvegarde.Drp_Information){
            this.drp=this.sauvegarde.Drp_Information;
        }
        else{
            this.router.navigate(['/StructuresUsers/Drp']);
        }
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.structures=data;
                this.structures = this.structures.filter(use => use.dg_drp.id === this.drp.id);
                this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
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
    prevPage() {
        this.router.navigate(['/StructuresUsers/Drp']);
    }
    nextPage() {
        if (this.structures) {
            this.sauvegarde.Structure_Information = this.structure;
            if(!this.sauvegarde.Structure_Information){
                this.submitted = true;
            }
            else{
                this.router.navigate(['/StructuresUsers/users']);
            }
            return;
        }
        this.submitted = true;
    }
}
