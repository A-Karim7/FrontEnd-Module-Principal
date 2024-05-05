import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import{AutoComplete} from "primeng/autocomplete";
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import {Sauvegarde} from "./Sauvegarde";
import { Directions } from "src/app/models/directions";
import { OrganisationService } from "../services/organisation.service";
import { Structure } from "src/app/models/structure";
import { Users } from "src/app/models/users";
import { KeycloakService } from "keycloak-angular";

@Component({
selector: 'app-structures',
template: `<div class="structures-content">
        <div class="card">
        <h3 class="bg-gray-200 p-3">Structure</h3>
                                <div class="p-fluid">
                                    <p-autoComplete placeholder="Choisir une structure" id="structures" [dropdown]="true" [multiple]="false" [suggestions]="filteredstructures" (completeMethod)="filterStructures($event)" field="libelle" [(ngModel)]="structure" ></p-autoComplete>
                                    <small *ngIf="(submitted)" class="p-error">Selectionnez une structure.</small>

                                </div>
<br><br>
            <div class="grid grid-nogutter justify-content-end">
                            <p-button label="Suivant" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                        </div>

        </div>
</div>`,
})


export class StructuresComponent implements OnInit {
submitted: boolean = false;
structures: Structure[];
structure: Structure;
filteredstructures: Structure[];
structurestemp: Structure[];
structurestemp2: Structure[];
structurestemp3: Structure[];
structurestemp4: Structure[];
structuretemp: Structure;
StructureInformation: Structure[];
utilisateur:Users;
memo: number;
memo2: number;
listRoles
constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router,private keycloakservice: KeycloakService) { }

ngOnInit() {
    this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles;
    this.structuretemp={};
    this.structuretemp.dg_structureBureau=[]
    this.organisationService.getAllUsersEmail(this.keycloakservice.getKeycloakInstance().profile.username).subscribe(
        (data)=>{
            this.utilisateur=data;
            console.log(this.utilisateur)
            console.log(this.keycloakservice.getKeycloakInstance().profile.username)
        }
    );
    this.organisationService.getAllDirections().subscribe(
        (data)=>{
            this.structures=data;
            this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
            this.structurestemp4=this.structures;
            this.structurestemp3=this.structures;
            this.structurestemp2=this.structures;
            this.structurestemp2=this.structurestemp2.filter(use => use.id === this.utilisateur.dg_structure.id);
            this.structuretemp=this.structurestemp2[0];
            console.log(this.structuretemp)
            console.log(data)
            this.filtre()/*
            setTimeout(function (){
                this.structures=this.usertemp
            },100)*/
        }
    );
}
    filterStructures(event) {
        const filtered: Structure[] = [];
        const query = event.query;
        if(this.findRole(['ROLE_DRP'])==true){
            for (let w = 0; w < this.structures.length; w++) {
                const struc = this.structures[w];
                if (struc.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(struc);
                }
            }
            this.filteredstructures = filtered;
        }
        else if(this.findRole(['ROLE_DER'])==true){
            for (let w = 0; w < this.structures.length; w++) {
                const country = this.structures[w];
                console.log(country)
                if (country.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(country);
                }
            }
            this.filteredstructures = filtered;
        }
        else{
            for (let i = 0; i < this.structures.length; i++) {
                const struc = this.structures[i];
                if (struc.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(struc);
                }
            }

            this.filteredstructures = filtered;
        }
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
        this.structures = this.structures.filter(use => use.dg_typeStructure.libelle === "DRP");
        this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
    }
    else if(this.findRole(['ROLE_DRP'])==true){
        this.structures = this.structures.filter(use => use.dg_drp.id === this.utilisateur.dg_structure.dg_drp.id && (use.dg_typeStructure.libelle === "Bureau" || use.dg_typeStructure.libelle === "Annexe"));
        this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
    }
    else if(this.findRole(['ROLE_RECEVEUR'])==true){
        this.structures = this.structures.filter(use => use.id === this.utilisateur.dg_structure.id);
        this.memo=1;
        console.log(this.structuretemp)
        this.structurestemp=[]
        console.log(this.structuretemp.dg_structureBureau)
            for (let a=0;a<this.structuretemp.dg_structureBureau.length;a++){
                this.structurestemp[a]=this.structuretemp.dg_structureBureau[a].annexe
            }
            for (let b=0;b<this.structuretemp.dg_structureBureau.length;b++){
                this.structurestemp4 = this.structurestemp4.filter(use => use.id === this.structurestemp[b].id && use.dg_typeStructure.libelle === "Annexe")
                if (this.structurestemp4[0] == undefined){
                }
                else{
                    console.log(this.structurestemp4[0])
                    this.structures[this.memo]=this.structurestemp4[0]
                    this.structurestemp4 = this.structurestemp3;
                    this.memo++;
                }
            }


       // this.structurestemp = this.structurestemp.filter(use => use.dg_structureBureau[a].annexe.id === use.dg_structureBureau[a].annexe.id && use.dg_typeStructure.libelle === "ANNEXE")
        console.log(this.structures)
        this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));

    }
    else if(this.findRole(['ROLE_RESPONSABLE_ANNEXE','ROLE_GRANDECAISSE'])==true){
        this.structures = this.structures.filter(use => use.id === this.utilisateur.dg_structure.id);
        this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
    }
    else{
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.structures=data;
                this.structures.sort((a,b) => a.libelle.localeCompare(b.libelle));
            }
        )
    }
}
cherhe(){
    this.organisationService.getAllDirectionsId(this.utilisateur.dg_structure.id).subscribe(
        (data)=>{
            this.structuretemp=data;
            console.log(this.structuretemp)
        }
    );
}
nextPage() {
    if (this.structures) {
        this.sauvegarde.StructureInformation = this.structures;
        this.sauvegarde.Structure_Information = this.structure;
        if(!this.sauvegarde.Structure_Information){
            this.submitted = true;
        }
        else{
            console.log(this.sauvegarde.Structure_Information.id);
            console.log(this.sauvegarde.Structure_Information.libelle);
            this.router.navigate(['utilisateurs/attributionroles/users']);
        }
        return;
    }
    this.submitted = true;
}
}
