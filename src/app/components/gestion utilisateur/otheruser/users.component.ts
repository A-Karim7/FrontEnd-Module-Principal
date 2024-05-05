import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { MessageService } from "primeng/api";
import { Fonctions } from "src/app/models/fonctions";
import { Modif } from "src/app/models/modif";
import { Roles } from "src/app/models/roles";
import { Structure } from "src/app/models/structure";
import { StructureAnnexe } from "src/app/models/structureAnnexe";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";


@Component({
    selector: 'app-users',
    template:`<div class="users-content">
                    <div class="card">


                        <p-toolbar styleClass="mb-4">
                            <ng-template pTemplate="left">
                                <div class="my-2">
                                </div>
                            </ng-template>

                            <ng-template pTemplate="right">

                                <button pButton pRipple label="Export PDF" icon="pi pi-upload" class="p-button-primary mr-2 " (click)="dt.exportCSV()"></button>
                                <button pButton pRipple label="Export Excel " icon="pi pi-upload" class="p-button-success" (click)="dt.exportCSV()"></button>

                            </ng-template>
                        </p-toolbar>
                        <div *ngIf="!attente" class="grid justify-content-center p-2 lg:p-0">
                            <h5 class="spinner">Veuillez Patienter...</h5>
                            <p-progressSpinner class="spinner"></p-progressSpinner>
                        </div>
                        <p-table #dt [value]="user" responsiveLayout="scroll" [rows]="10" [globalFilterFields]="['nom','prenom','email','matricule','telephone']" [rows]="10" [paginator]="true" [rowsPerPageOptions]="[10,20,30]" [showCurrentPageReport]="true" currentPageReportTemplate="Affichage des {first} aux {last}èmes des  {totalRecords} entrées" [(selection)]="selectedUsers" selectionMode="multiple" [rowHover]="true" dataKey="id">
                        <ng-template pTemplate="caption">
                            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                                <h5 class="m-0">{{titre}}  </h5>
                                <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Rechercher..." />
                        </span>
                            </div>
                        </ng-template>
                        <ng-template pTemplate="header">
                                <tr>
                                    <th style="width: 3rem"></th>
                                    <th pSortableColumn="nom">Nom <p-sortIcon field="nom"></p-sortIcon></th>
                                    <th pSortableColumn="prenom">Prenom <p-sortIcon field="prenom"></p-sortIcon></th>
                                    <th pSortableColumn="role">Role <p-sortIcon field="role"></p-sortIcon></th>
                                    <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
                                    <th pSortableColumn="telephone">Telephone <p-sortIcon field="telephone"></p-sortIcon></th>
                                    <th pSortableColumn="matricule">Matricule <p-sortIcon field="matricule"></p-sortIcon></th>
                                    <th pSortableColumn="reference">Reference <p-sortIcon field="reference"></p-sortIcon></th>
                                    <th pSortableColumn="fonction">Fonction <p-sortIcon field="fonction"></p-sortIcon></th>

                                    <th pSortableColumn="enable">Etat User <p-sortIcon field="fonction"></p-sortIcon></th>
                                    <th>Action</th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-user>
                                <tr>
                                    <td></td>
                                    <td style="min-width:10rem;"><span class="p-column-title">Nom</span>
                                        {{user.nom}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Prenom</span>
                                        {{user.prenom}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Role</span>
                                        <span *ngFor="let ro of user.roles">
                                        {{ro.authority}}, &nbsp;

                                </span>
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Email</span>
                                        {{user.email}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Telephone</span>
                                        {{user.telephone}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Matricule</span>
                                        {{user.matricule}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Reference</span>
                                        {{user.reference}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Fonction</span>
                                        <div *ngIf="user.dg_fonction">
                                            {{user.dg_fonction.libelle}}
                                        </div>
                                        <div *ngIf="!user.dg_fonction">
                                        </div>
                                    </td>
                                    <td style="min-width:10rem;">
                                    <span class="p-column-title">Enable</span>
                                    <div *ngIf="user?.enable==true">
                                        Actif
                                    </div>
                                    <div *ngIf="user?.enable==false">
                                    Inactif
                                    </div>
                                </td>
                                    <td>
                                        <div class="flex">
                                            <button pButton pRipple type="button" icon="pi pi-history" class="p-button-rounded p-button-warning mr-2 mb-2" (click)="Historique(user)" pTooltip="Historique"></button>
                                        </div>
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>

                        <p-dialog [(visible)]="productDialog3" [style]="{width: '900px'}" header="Historique {{nom}}"  [modal]="true" class="p-fluid">
                            <ng-template pTemplate="content">
                                <p-table #dt [value]="historique" rowGroupMode="subheader" groupRowsBy="representative.name" sortField="representative.name" sortMode="single" responsiveLayout="scroll" [scrollable]="true" scrollHeight="400px">
                                    <ng-template pTemplate="header">
                                        <tr>
                                            <th>Date Affectation</th>
                                            <th>Fonctions</th>
                                            <th>Structures</th>
                                        </tr>
                                    </ng-template>
                                    <ng-template pTemplate="body" let-histor>
                                        <tr>
                                            <td style="min-width:10rem;">
                                <span *ngIf="histor.dateTransfert">
                                    {{histor.dateTransfert | date:' dd/MM/yyyy, à HH:mm'}}
                                </span>
                                            </td>
                                            <td style="min-width: 200px;">
                                                <span *ngIf="histor.dg_fonction_arrivee">{{histor.dg_fonction_arrivee.libelle}}</span>
                                            </td>
                                            <td style="min-width: 200px;">
                                                <span *ngIf="histor.dg_structureArr">{{histor.dg_structureArr.libelle}}</span>
                                            </td>
                                        </tr>
                                    </ng-template>
                                </p-table>
                            </ng-template>

                            <ng-template pTemplate="footer">
                                <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
                            </ng-template>
                        </p-dialog>
                        <p-dialog header="Liste des Utilisateurs" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{width: '95vw'}" [contentStyle]="{height: '500px'}">
                            <div *ngIf="!attenteb" class="grid justify-content-center p-2 lg:p-0">
                                <h5 class="spinner">Veuillez Patienter...</h5>
                                <p-progressSpinner class="spinner"></p-progressSpinner>
                            </div>
                            <p-table #dtt [value]="utilisateurs" [columns]="cols" responsiveLayout="scroll" [rows]="10" [globalFilterFields]="['prenom','nom','telephone','email','matricule']" [rows]="10" [paginator]="true" [rowsPerPageOptions]="[10,20,30]" [showCurrentPageReport]="true" currentPageReportTemplate="Affichage des {first} aux {last}èmes des  {totalRecords} entrées"  selectionMode="multiple" [rowHover]="true" dataKey="id">
                                <ng-template pTemplate="caption">
                                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                                        <h5 class="m-0">{{titre2}}</h5>
                                        <span class="block mt-2 md:mt-0 p-input-icon-left">
                                                <i class="pi pi-search"></i>
                                                <input pInputText type="text" (input)="dtt.filterGlobal($event.target.value, 'contains')" placeholder="Rechercher..." />
                                            </span>
                                    </div>
                                </ng-template>
                                <ng-template pTemplate="header">
                                    <tr>
                                        <th style="width: 3rem"></th>
                                        <th pSortableColumn="nom">Nom <p-sortIcon field="nom"></p-sortIcon></th>
                                        <th pSortableColumn="prenom">Prenom <p-sortIcon field="prenom"></p-sortIcon></th>
                                        <th pSortableColumn="role">Role <p-sortIcon field="role"></p-sortIcon></th>
                                        <th pSortableColumn="email">Email <p-sortIcon field="email"></p-sortIcon></th>
                                        <th pSortableColumn="telephone">Telephone <p-sortIcon field="telephone"></p-sortIcon></th>
                                        <th pSortableColumn="matricule">Matricule <p-sortIcon field="matricule"></p-sortIcon></th>
                                        <th pSortableColumn="reference">Reference <p-sortIcon field="reference"></p-sortIcon></th>
                                        <th pSortableColumn="fonction">Fonction <p-sortIcon field="fonction"></p-sortIcon></th>

                                        <th pSortableColumn="enable">Etat User <p-sortIcon field="enable"></p-sortIcon></th>
                                        <th></th>
                                        <th>Actions</th>
                                        <th></th>
                                    </tr>
                                </ng-template>
                                <ng-template pTemplate="body" let-user>
                                <tr>
                                    <td></td>
                                    <td style="min-width:10rem;"><span class="p-column-title">Nom</span>
                                        {{user.nom}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Prenom</span>
                                        {{user.prenom}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Role</span>
                                        <span *ngFor="let ro of user.roles">
                                        {{ro.authority}}, &nbsp;

                                </span>
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Email</span>
                                        {{user.email}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Telephone</span>
                                        {{user.telephone}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Matricule</span>
                                        {{user.matricule}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Reference</span>
                                        {{user.reference}}
                                    </td>
                                    <td style="min-width:10rem;">
                                        <span class="p-column-title">Fonction</span>
                                        <div *ngIf="user.dg_fonction">
                                            {{user.dg_fonction.libelle}}
                                        </div>
                                        <div *ngIf="!user.dg_fonction">
                                        </div>
                                    </td>

                                    <td style="min-width:10rem;">
                                    <span class="p-column-title">Enable</span>
                                    <div *ngIf="user?.enable==true">
                                        Actif
                                    </div>
                                    <div *ngIf="user?.enable==false">
                                    Inactif
                                    </div>
                                </td>
                                    <td>
                                        <div class="flex">
                                            <button pButton pRipple *ngIf="findRole(['ROLE_SUPERADMIN'])" icon="pi pi-pencil" class="p-button-rounded p-button-primary mr-2" (click)="editUser(user)"></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <button pButton pRipple *ngIf="findRole(['ROLE_SUPERADMIN'])" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary mr-2 mb-2" (click)="editStru(user)" pTooltip="Modifier Structures et Fonctions"></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <button pButton pRipple type="button" icon="pi pi-history" class="p-button-rounded p-button-warning mr-2 mb-2" (click)="Historique(user)" pTooltip="Historique"></button>
                                        </div>
                                    </td>
                                </tr>
                                </ng-template>
                            </p-table>
                            <ng-template pTemplate="footer">
                                <button pButton pRipple icon="pi pi-times" type="button" label="Fermer" class="p-button-danger p-button-text" (click)="hideDialog()"></button>
                            </ng-template>
                        </p-dialog>
                        <br><br>
                        <div class="col-12 md:col-6" *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER', 'ROLE_DRP', 'ROLE_RECEVEUR'])">
                            <div class="p-fluid">
                                    <h5>Liste structures annexes</h5>
                                    <div class="field">
                                        <p-listbox [options]="annexes" [(ngModel)]="annexe" optionLabel="annexe.libelle" [style]="{'width':'15rem'}" (click)="showDialog(annexe)"></p-listbox>
                                    </div>
                            <br>
                            </div>
                        </div>
                        <br> <br>
                                <div>
                            <p-button label="Précèdent" (onClick)="prevPage()" icon="pi pi-angle-left" iconPos="left"></p-button>
                        </div>
                    </div>
              </div>`
})
export class UsersComponent implements OnInit {

    constructor( private messageService: MessageService, public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router, private keycloakservice: KeycloakService) { }

    filtereddirections: Structure[];
    filteredfonctions:Structure[];
    directioon: Structure[];
    fonction: Fonctions[];
    annexes: StructureAnnexe[];
    annexe: StructureAnnexe;
    user: Users[];
    selectedUsers: Users[];
    roles: Roles[];
    fonctions: Fonctions;
    utilisateur: Users;
    utilisateurs: Users[];
    historique: Modif;
    rol: Roles;
    FonctionDialog: boolean;
    RolesDialog: boolean;
    productDialog2: boolean;
    productDialog3: boolean;
    structDialog : boolean;
    submitted: boolean;
    productDialog: boolean;
    dialogVisible : boolean;
    attente: boolean;
    attenteb:boolean;
    nombre:number;
    nom: string;
    titre: string;
    titre2: string;
    cols: any[];
    listRoles;

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles;
        if(this.sauvegarde.Users_Information && this.sauvegarde.Drp_Information && this.sauvegarde.Structure_Information){

        }
        else{
            this.router.navigate(['/OtherUsers/Drp']);
        }
        this.organisationService.getAllRoles().subscribe(
            (data)=>{
                this.roles=data;
            }
        );
        this.organisationService.getAllAnnexes().subscribe(
            (data)=>{
                this.annexes=data;
                this.filtre()
            }
        );
        this.organisationService.getAllUsers().subscribe(
            (data) => {
                this.user = data;
                this.user = this.user.filter(use => use.dg_structure.id === this.sauvegarde.Structure_Information.id);
                this.attente=true;
            }
        );
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.directioon=data;
            }
        );
        this.organisationService.getAllFonctions().subscribe(
            (data)=>{
                this.fonction=data;
            }
        );
        this.titre=this.sauvegarde.Structure_Information.libelle
    }
    openNewRole(){
        this.rol={}
        this.submitted = false;
        this.RolesDialog = true;
    }
    openNewF(){
        this.fonctions={}
        this.submitted = false;
        this.FonctionDialog = true;
    }
    openNew() {
        this.utilisateur = {};
        this.submitted = false;
        this.productDialog = true;
    }
    editUser(utilisateur: Users) {
        this.utilisateur = {...utilisateur};
        console.log(this.utilisateur)
        this.productDialog2 = true;
    }
    editStru(utilisateur: Users) {
        this.utilisateur = utilisateur;
        this.utilisateur = {...utilisateur};
        this.structDialog = true;
    }
    Historique(utilisateur: Users){
        this.utilisateur = utilisateur;
        console.log(this.utilisateur)
        this.nom=this.utilisateur.prenom+' '+this.utilisateur.nom;
        this.productDialog3 = true;
        this.organisationService.getModifUser(this.utilisateur.id).subscribe(
            (data)=>
            {
                this.historique=data;
                console.log(data)
                console.log(this.historique)
            },
            (error)=>
            {
                this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Une erreur s\'est produit au niveau de l\'affichage', life: 3000});
            }
        )
        console.log(this.historique)
    }
    hideDialog() {
        this.dialogVisible = false;
        this.productDialog = false;
        this.productDialog2= false;
        this.productDialog3= false;
        this.structDialog = false;
        this.submitted = false;
    }
    filterDirections(event) {
        if(this.findRole(['ROLE_DER'])==true){
            this.directioon = this.directioon.filter(use => use.dg_typeStructure.libelle === "DRP");
        }
        else if(this.findRole(['ROLE_DRP'])==true){
            this.directioon = this.directioon.filter(use => use.dg_drp.id === this.sauvegarde.Structure_Information.dg_drp.id && use.dg_typeStructure.libelle === "Bureau");
        }
        else{
        }
        const filtered: Structure[] = [];
        const query = event.query;
        for (let i = 0; i < this.directioon.length; i++) {
            const country = this.directioon[i];
            if (country.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filtereddirections = filtered;
    }
    filterFonctions(event) {
        const filtered: Fonctions[] = [];
        const query = event.query;
        for (let i = 0; i < this.fonction.length; i++) {
            const country = this.fonction[i];
            if (country.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredfonctions = filtered;
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
        if(this.findRole(['ROLE_DER', 'ROLE_DRP', 'ROLE_RECEVEUR'])==true){
            this.annexes = this.annexes.filter(use => use.bureau.id === this.sauvegarde.Structure_Information.id);
            console.log(this.annexes)
        }
        else{

        }
    }
    showDialog(annexe) {
        this.dialogVisible = true;
        this.titre2=annexe.annexe.libelle
        this.organisationService.getAllUsers().subscribe(
            (data) => {
                this.utilisateurs = data;
                this.utilisateurs = this.utilisateurs.filter(use => use.dg_structure.id === this.annexe.annexe.id);
                this.attenteb = true;
            }
        );
    }
    prevPage() {
        this.router.navigate(['/OtherUsers/structures']);
    }
    nextPage(utilisateur: Users) {
        console.log(this.utilisateur);
        this.utilisateur = {...utilisateur};
        this.sauvegarde.Users_Information = this.utilisateur;
        this.sauvegarde.temp=this.utilisateur.roles;
        this.router.navigate(['/OtherUsers/roles']);
    }
}
