import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Drp } from "src/app/models/drp";
import { Structure } from "src/app/models/structure";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
    template: `<div class="structures_drp-content">
            <div class="card">
                <h2 *ngIf="this.sauvegarde.Users_drp_Information">{{this.sauvegarde.Users_drp_Information.dg_structure.dg_drp.libelle}}</h2>
                <div class="p-fluid">
                    <p-autoComplete placeholder="Choisir un bureau" id="structures" [dropdown]="true" [multiple]="false" [suggestions]="filteredstructures" (completeMethod)="filterStructures($event)" field="libelle" [(ngModel)]="structure" ></p-autoComplete>
                    <small *ngIf="(submitted)" class="p-error">Selectionnez un bureau.</small>
                </div>
                <br><br>
                <div class="grid grid-nogutter justify-content-end">
                    <p-button label="Suivant" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                </div>
            </div>
    </div>`,
})

export class Structures_drpComponent implements OnInit {
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
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.structures=data;
                this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
                this.structures = this.structures.filter(use => use.dg_drp.id === this.sauvegarde.Users_drp_Information.dg_structure.dg_drp.id && use.dg_typeStructure.libelle === "Bureau");
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
    nextPage() {
        if (this.structure) {
            this.sauvegarde.Structure_drp_Information = this.structure;
                this.router.navigate(['/Users_bureaux/Users']);
        }
        this.submitted = true;
    }
}
