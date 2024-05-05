import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { Drp } from "src/app/models/drp";
import { Structure } from "src/app/models/structure";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
    selector: 'app-drp_der',
    template: `<div class="drp_der-content">
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


export class Drp_derComponent implements OnInit {
    submitted: boolean = false;
    drps: Drp[];
    drp: Drp;
    filteredstructures: Structure[];
    StructureInformation: Structure[];
    structures: Structure[];
    utilisateur:Users;
    memo: number;
    listRoles
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router,private keycloakservice: KeycloakService) { }

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        this.organisationService.getAllDRP().subscribe(
            (data)=>{
                this.drps=data;
                this.drps = this.drps.filter(use => use.libelle !== "SERVICES CENTRAUX");
                this.drps.sort((a,b) => a.libelle.localeCompare(b.libelle));
            }
        );
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.structures=data;
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
    nextPage() {
        if (this.drp) {
            this.sauvegarde.Drp_der_Information = this.drp;
            console.log(this.drp)
            console.log(this.structures)
            this.structures = this.structures.filter(use => use.dg_drp.id === this.drp.id && use.dg_typeStructure.id===2);
            console.log(this.structures)
            this.sauvegarde.Structure_der_Information=this.structures[0];
           this.router.navigate(['/Users_drp/Users']);
        }
        this.submitted = true;
    }
}
