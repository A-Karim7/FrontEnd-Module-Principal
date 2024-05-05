import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { Fonctions } from "src/app/models/fonctions";
import { Modif } from "src/app/models/modif";
import { Roles } from "src/app/models/roles";
import { Structure } from "src/app/models/structure";
import { StructureAnnexe } from "src/app/models/structureAnnexe";
import { Users } from "src/app/models/users";
import { environment } from "src/environments/environment.prod";
import { OrganisationService } from "../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
    selector: 'app-users',
    template:`<div class="users-content">
                    <div class="card">

                        <p-toolbar styleClass="mb-4">
                            <ng-template pTemplate="left">
                                <div class="my-2">
                                    <button pButton pRipple label="Nouveau" *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER','ROLE_DRP'])" icon="pi pi-plus" class="p-button-primary mr-2" (click)="openNew()"></button>
                                    <button pButton pRipple label="Management Role" *ngIf="findRole(['ROLE_SUPERADMIN'])" icon="pi pi-plus" class="p-button-primary mr-2" (click)="openNewRole()"></button>
                                    <button pButton pRipple label="Management Fonction" *ngIf="findRole(['ROLE_SUPERADMIN'])"  icon="pi pi-plus" class="p-button-primary mr-2" (click)="openNewF()"></button>
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
                                <span class="block mt-2 md:mt-0 p-input-icon-right">
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
                                            <button pButton pRipple  *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER','ROLE_DRP'])"  icon="pi pi-pencil" class="p-button-rounded p-button-primary mr-2" (click)="editUser(user)"></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <button pButton pRipple *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER','ROLE_DRP'])" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary mr-2 mb-2" (click)="editStru(user)" pTooltip="Modifier Structures et Fonctions"></button>
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
                        <p-dialog [(visible)]="productDialog" [style]="{width: '700px'}" header="Création utilisateur"
                                  [modal]="true" class="p-fluid">
                            <h6 align="right"><span style="color: red"> *</span> Champs Obligatoires</h6>
                            <ng-template pTemplate="content">
                                <br>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="nom">Nom <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="nom" [(ngModel)]="utilisateur.nom" required [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.nom}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.nom">Le nom est obligatoire.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="prenom">Prenom <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="prenom" [(ngModel)]="utilisateur.prenom" required [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.prenom}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.prenom">Le prenom est obligatoire.</small>
                                    </div>
                                </div>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="email">Email <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" [(ngModel)]="utilisateur.email" required [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.email}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.email">L'email est obligatoire.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="telephone">Téléphone</label>
                                        <input type="text" pInputText id="telephone" pattern="[0-9]{9}" [(ngModel)]="utilisateur.telephone"/>
                                    </div>
                                </div>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="directions">Structures <span style="color: red"> *</span></label>
                                        <br>
                                        <p-autoComplete placeholder="Search" id="directions" [dropdown]="true" [multiple]="false" [suggestions]="filtereddirections" (completeMethod)="filterDirections($event)" field="libelle" [(ngModel)]="utilisateur.dg_structure" [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.dg_structure}"></p-autoComplete>
                                        <small *ngIf="submitted && !utilisateur.dg_structure" class="p-error">Selectionnez une structure.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="directions">Fonctions <span style="color: red"> *</span></label>
                                        <p-autoComplete placeholder="Search" id="fonctions" [dropdown]="true" [multiple]="false" [suggestions]="filteredfonctions" (completeMethod)="filterFonctions($event)" field="libelle" [(ngModel)]="utilisateur.dg_fonction"></p-autoComplete>
                                    </div>
                                </div>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="matricule">Matricule <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="matricule" pattern="([aA-zZ]{1})([0-9]{6})" [(ngModel)]="utilisateur.matricule" required [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.matricule}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.matricule">Matricule doit etre du format A123456.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="reference">Reference</label>
                                        <p-inputNumber id="reference" [(ngModel)]="utilisateur.reference" mode="decimal" min="6" max="6" maxlength="6" [useGrouping]="false"> </p-inputNumber>
                                    </div>
                                </div>
                                <h5>Etat compte</h5>
                                <p-toggleButton onLabel="Actif" offLabel="Inactif" [style]="{width:'10em'}" [(ngModel)]="utilisateur.enable"></p-toggleButton>
                            </ng-template>

                            <ng-template pTemplate="footer">
                                <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
                                <button pButton pRipple label="Save" icon="pi pi-check" class="p-button-text" (click)="Verif()"></button>
                            </ng-template>
                        </p-dialog>
                        <p-dialog [(visible)]="productDialog2" [style]="{width: '700px'}" header="Utilisateurs"
                                  [modal]="true" class="p-fluid">
                            <h6 align="right"><span style="color: red"> *</span> Champs Obligatoires</h6>
                            <ng-template pTemplate="content">
                                <br>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="nom">Nom <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="nom2" [(ngModel)]="utilisateur.nom" required
                                               [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.nom}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.nom">Le nom
                                            est obligatoire.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="prenom">Prenom <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="prenom2" [(ngModel)]="utilisateur.prenom"
                                               required
                                               [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.prenom}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.prenom">Le
                                            prenom est obligatoire.</small>
                                    </div>
                                </div>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="email">Email <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="email2" [(ngModel)]="utilisateur.email"
                                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" required
                                               [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.email}" readonly/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.email">L'email
                                            est obligatoire.</small>

                                    </div>
                                    <div class="field col">
                                        <label for="telephone">Téléphone</label>
                                        <input type="text" pInputText id="telephone2" pattern="[0-9]{9}"
                                               [(ngModel)]="utilisateur.telephone" required
                                               [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.telephone}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.telephone">Telephone
                                            est obligatoire.</small>
                                    </div>
                                </div>
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="matricule">Matricule <span style="color: red"> *</span></label>
                                        <input type="text" pInputText id="matricule2" pattern="[0-9]{6}.[A-Z]{0}"
                                               [(ngModel)]="utilisateur.matricule" required
                                               [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.matricule}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.matricule">Matricule
                                            doit etre du format 123456A.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="reference">Reference</label>
                                        <input type="text" pInputText id="reference2"
                                               [(ngModel)]="utilisateur.reference" required
                                               [ngClass]="{'ng-invalid ng-dirty' : submitted && !utilisateur.reference}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !utilisateur.reference">Reference
                                            est obligatoire.</small>
                                    </div>
                                </div>
                                <h5>Etat compte</h5>
                                <p-toggleButton [(ngModel)]="utilisateur.enable"  onLabel="Actif" offLabel="Inactif" [style]="{width:'10em'}"></p-toggleButton>
                            </ng-template>

                            <ng-template pTemplate="footer">
                                <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text"
                                        (click)="hideDialog()"></button>
                                <button pButton pRipple label="Save"
                                        [disabled]="!utilisateur.nom || !utilisateur.prenom || !utilisateur.email || !utilisateur.matricule"
                                        icon="pi pi-check" class="p-button-text" (click)="saveUser()"></button>
                            </ng-template>
                        </p-dialog>

                        <p-dialog [(visible)]="structDialog" [style]="{width: '700px'}" header="Transfert {{nom}}" [modal]="true" class="p-fluid">
                            <ng-template pTemplate="content">
                                <div class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="directions">Structures</label>
                                        <br>
                                        <p-autoComplete placeholder="Search" id="directions" [dropdown]="true"
                                                        [multiple]="false" [suggestions]="filtereddirections"
                                                        (completeMethod)="filterDirections($event)" field="libelle"
                                                        [(ngModel)]="utilisateur.dg_structure"></p-autoComplete>
                                    </div>
                                    <div class="field col">
                                        <label for="fonctions">Fonctions</label>
                                        <p-autoComplete placeholder="Search" id="fonctions" [dropdown]="true"
                                                        [multiple]="false" [suggestions]="filteredfonctions" (completeMethod)="filterFonctions($event)" field="libelle"
                                                        [(ngModel)]="utilisateur.dg_fonction"></p-autoComplete>
                                    </div>
                                </div>
                                <div class="field col">
                                    <br> <br>
                                </div>
                            </ng-template>

                            <ng-template pTemplate="footer">
                                <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text"
                                        (click)="hideDialog()"></button>
                                <button pButton pRipple label="Save"

                                        icon="pi pi-check" class="p-button-text" (click)="saveUserprime()"></button>
                            </ng-template>
                        </p-dialog>

                        <p-dialog [(visible)]="productDialog3" [style]="{width: '900px'}" header="Historique {{nom}}" [modal]="true" class="p-fluid">
                            <ng-template pTemplate="content">
                                <p-table #dt [value]="historique" rowGroupMode="subheader" groupRowsBy="representative.name" sortField="representative.name" sortMode="single" responsiveLayout="scroll" [scrollable]="true" scrollHeight="400px">
                                    <ng-template pTemplate="header">
                                        <tr>
                                            <th>Date Affecation</th>
                                            <th>Fonctions</th>
                                            <th>Structures</th>
                                        </tr>
                                    </ng-template>
                                    <ng-template pTemplate="body" let-modi>
                                        <tr>
                                            <td style="min-width:200px;"><span class="p-column-title">Date</span>{{modi.dateTransfert | date:' dd/MM/yyyy, à HH:mm'}}</td>
                                            <td style="min-width:200px;"><span class="p-column-title">Fontions</span>{{modi.dg_fonction_arrivee.libelle}}</td>
                                            <td style="min-width:200px;"><span class="p-column-title">Structures</span>{{modi.dg_structureArr.libelle}}</td>
                                        </tr>
                                    </ng-template>
                                </p-table>
                            </ng-template>

                            <ng-template pTemplate="footer">
                                <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
                            </ng-template>
                        </p-dialog>
                        <p-dialog header="Liste des Utilisateurs" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{width: '95vw'}" [contentStyle]="{height: '500px'}">
                            <p-toolbar styleClass="mb-4">
                                <ng-template pTemplate="left">
                                    <div class="my-2">
                                        <button pButton pRipple label="Nouveau" *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER','ROLE_DRP'])" icon="pi pi-plus" class="p-button-primary mr-2" (click)="openNew()"></button>
                                    </div>
                                </ng-template>


                                <ng-template pTemplate="right">



                                    <button pButton pRipple label="Export PDF" icon="pi pi-upload" class="p-button-primary mr-2 " (click)="dt.exportCSV()"></button>
                                    <button pButton pRipple label="Export Excel " icon="pi pi-upload" class="p-button-success" (click)="dt.exportCSV()"></button>

                                </ng-template>
                            </p-toolbar>
                            <p-table #dtt [value]="utilisateurs" [columns]="cols" responsiveLayout="scroll" [rows]="10" [globalFilterFields]="['nom','prenom','email','matricule','reference']" [rows]="10" [paginator]="true" [rowsPerPageOptions]="[10,20,30]" [showCurrentPageReport]="true" currentPageReportTemplate="Affichage des {first} aux {last}èmes des  {totalRecords} entrées"  selectionMode="multiple" [rowHover]="true" dataKey="id">

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
                                            <button pButton pRipple *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER','ROLE_DRP'])" icon="pi pi-pencil" class="p-button-rounded p-button-primary mr-2" (click)="editUser(user)"></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex">
                                            <button pButton pRipple *ngIf="findRole(['ROLE_SUPERADMIN','ROLE_DER','ROLE_DRP'])" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary mr-2 mb-2" (click)="editStru(user)" pTooltip="Modifier Structures et Fonctions"></button>
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
                        <p-dialog [(visible)]="RolesDialog" header="Roles" [modal]="true" [style]="{width:'700px'}" class="p-fluid">
                            <ng-template pTemplate="content">
                                <br>
                                <ng class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="authority">Libelle</label>
                                        <input type="text" pInputText id="authority"  [(ngModel)]="rol.authority"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !rol.authority">Le libelle est obligatoire.</small>
                                    </div>
                                    <div class="field col">
                                        <label for="description">Description</label>
                                        <input type="text" pInputText id="description" [(ngModel)]="rol.description" required [ngClass]="{'ng-invalid ng-dirty' : submitted && !rol.description}"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !rol.description">La description est obligatoire.</small>
                                    </div>
                                </ng>
                                <div class="grid grid-nogutter justify-content-start">
                                    <button pButton pRipple label="Nouveau" iconPos="right" [disabled]="!rol.authority || !rol.description" (click)="saveRole()" ></button>

                                </div>
                                <br><br>
                                <p-table [value]="roles" dataKey="id" editMode="row" responsiveLayout="scroll">
                                    <ng-template pTemplate="header">
                                        <h5>Liste des roles disponible</h5>
                                    </ng-template>
                                    <ng-template pTemplate="body" let-rol let-editing="editing" let-ri="rowIndex">
                                        <tr [pEditableRow]="rol">
                                            <td>
                                                <p-cellEditor>
                                                    <ng-template pTemplate="input">
                                                        <input pInputText type="text" [(ngModel)]="rol.authority">
                                                    </ng-template>
                                                    <ng-template pTemplate="output">
                                                        Role: <b>{{rol.authority}}</b>
                                                    </ng-template>
                                                </p-cellEditor>
                                            </td>
                                            <td>
                                                <p-cellEditor>
                                                    <ng-template pTemplate="input">
                                                        <input pInputText type="text" [(ngModel)]="rol.description" required>
                                                    </ng-template>
                                                    <ng-template pTemplate="output">
                                                        Description: <b>{{rol.description}}</b>
                                                    </ng-template>
                                                </p-cellEditor>
                                            </td>
                                            <td style="text-align:center">
                                                <button *ngIf="!editing" pButton pRipple type="button" pInitEditableRow icon="pi pi-pencil" (click)="UpdateRole(rol)" class="p-button-rounded p-button-text"></button>
                                                <button *ngIf="editing" pButton pRipple type="button" pSaveEditableRow icon="pi pi-check" (click)="UpdateRoleSave(rol)" class="p-button-rounded p-button-text p-button-success mr-2"></button>
                                                <button *ngIf="editing" pButton pRipple type="button" pCancelEditableRow icon="pi pi-times" (click)="Cancel(rol)" class="p-button-rounded p-button-text p-button-danger"></button>
                                            </td>
                                        </tr>
                                    </ng-template>
                                </p-table>
                            </ng-template>

                            <ng-template pTemplate="footer">

                            </ng-template>
                        </p-dialog>
                        <p-dialog [(visible)]="FonctionDialog" header="Fonctions" [modal]="true" [style]="{width:'700px'}" class="p-fluid">
                            <ng-template pTemplate="content">
                                <br>
                                <ng class="p-formgrid grid">
                                    <div class="field col">
                                        <label for="libelle">Libelle</label>
                                        <input type="text" pInputText id="libelle"  [(ngModel)]="fonctions.libelle"/>
                                        <small class="ng-dirty ng-invalid" *ngIf="submitted && !fonctions.libelle">Le libelle est obligatoire.</small>
                                    </div>
                                </ng>
                                <div class="grid grid-nogutter justify-content-start">
                                    <button pButton pRipple label="Nouveau" iconPos="right" [disabled]="!fonctions.libelle" (click)="saveFonction()" ></button>

                                </div>
                                <br><br>
                                <p-table [value]="fonction" dataKey="id" editMode="row" responsiveLayout="scroll">
                                    <ng-template pTemplate="header">
                                        <h5>Liste des fonctions disponible</h5>
                                    </ng-template>
                                    <ng-template pTemplate="body" let-fonctions let-editing="editing" let-ri="rowIndex">
                                        <tr [pEditableRow]="fonctions">
                                            <td>
                                                <p-cellEditor>
                                                    <ng-template pTemplate="input">
                                                        <input pInputText type="text" [(ngModel)]="fonctions.libelle">
                                                    </ng-template>
                                                    <ng-template pTemplate="output">
                                                        Fonction: <b>{{fonctions.libelle}}</b>
                                                    </ng-template>
                                                </p-cellEditor>
                                            </td>
                                            <td style="text-align:center">
                                                <button *ngIf="!editing" pButton pRipple type="button" pInitEditableRow icon="pi pi-pencil" (click)="UpdateFonction(fonctions)" class="p-button-rounded p-button-text"></button>
                                                <button *ngIf="editing" pButton pRipple type="button" pSaveEditableRow icon="pi pi-check" (click)="UpdateFonctionSave(fonctions)" class="p-button-rounded p-button-text p-button-success mr-2"></button>
                                                <button *ngIf="editing" pButton pRipple type="button" pCancelEditableRow icon="pi pi-times" (click)="CancelF(fonctions)" class="p-button-rounded p-button-text p-button-danger"></button>
                                            </td>
                                        </tr>
                                    </ng-template>
                                </p-table>
                            </ng-template>

                            <ng-template pTemplate="footer">

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

    constructor(private http: HttpClient, private messageService: MessageService, public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router, private keycloakservice: KeycloakService) { }

    filtereddirections: Structure[];
    filteredfonctions:Structure[];
    directioon: Structure[];
    direction: Structure[];
    fonction: Fonctions[];
    annexes: StructureAnnexe[];
    annexe: StructureAnnexe;
    user: Users[];
    selectedUsers: Users[];
    roles: Roles[];
    fonctions: Fonctions;
    fonctionsC: Fonctions;
    fonctionsP: Fonctions;
    utilisateur: Users;
    utilisateuur: Users;
    utilisateurexistant: Users;
    utilisateurs: Users[];
    historique: Modif;
    rol: Roles;
    Clonesrol: Roles;
    fonctionSubject = new Subject<void>();
    roleSubject = new Subject<void>();
    userSubject = new Subject<void>();
    FonctionDialog: boolean;
    RolesDialog: boolean;
    productDialog2: boolean;
    productDialog3: boolean;
    structDialog : boolean;
    submitted: boolean;
    productDialog: boolean;
    dialogVisible : boolean;
    existe: boolean;
    attente: boolean;
    nom:string;
    nombre:number;
    titre: string;
    titre2: string;
    cols: any[];
    listRoles;

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles;
        if(this.sauvegarde.Users_Information && this.sauvegarde.Drp_Information && this.sauvegarde.Structure_Information){

        }
        else{
            this.router.navigate(['/StructuresUsers/Drp']);
        }
        this.organisationService.getAllRoles().subscribe(
            (data)=>{
                this.roles=data;
            }
        );
        this.organisationService.getAllAnnexes().subscribe(
            (data)=>{
                this.annexes=data;
                this.annexes = this.annexes.filter(use => use.bureau.id === this.sauvegarde.Structure_Information.id);
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
                this.directioon.sort((a,b) => a.libelle.localeCompare(b.libelle));
            }
        );
        this.organisationService.getAllFonctions().subscribe(
            (data)=>{
                this.fonction=data;
                this.fonction.sort((a,b) => a.libelle.localeCompare(b.libelle));
                console.log(this.fonction)
            }
        );
        this.titre=this.sauvegarde.Structure_Information.libelle
        this.userSubject.subscribe
        ( (data)=>
            {
                this.haveAllUser();
            }
        )
        this.haveAllUser();

        this.fonctionSubject.subscribe
        ( (data)=>
            {
                this.haveAllFonction();
            }
        )
        this.haveAllFonction();

        this.roleSubject.subscribe
        ( (data)=>
            {
                this.haveAllRole();
            }
        )
        this.haveAllRole();
    }
    haveAllRole() {
        this.organisationService.getAllRoles().subscribe (

            (data:Users[])=>
            {
                this.roles=data
            }
        )

    }
    haveAllFonction() {
        this.organisationService.getAllFonctions().subscribe (

            (data:Users[])=>
            {
                this.fonction=data
                this.fonction.sort((a,b) => a.libelle.localeCompare(b.libelle));
            }
        )

    }
    haveAllUser() {
        this.organisationService.getAllUsers().subscribe (
            (data:Users[])=>
            {
                this.user = data;
                this.user = this.user.filter(use => use.dg_structure.id === this.sauvegarde.Structure_Information.id);

            }
        )
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
        this.utilisateuur = {};
        this.utilisateuur.dg_fonction={};
        this.submitted = false;
        this.productDialog = true;
    }
    editUser(utilisateur: Users) {
        this.utilisateur = {...utilisateur};
        console.log(this.utilisateur)
        this.utilisateuur = {};
        this.utilisateuur.dg_fonction={};
        this.productDialog2 = true;
    }
    editStru(utilisateur: Users) {
        this.utilisateur = utilisateur;
        this.utilisateur = {...utilisateur};
        this.utilisateuur = {};
        this.utilisateuur.dg_fonction={};
        this.structDialog = true;
        this.nom=this.utilisateur.prenom+' '+this.utilisateur.nom;
    }
    Historique(utilisateur: Users){
        this.utilisateur = utilisateur;
        console.log(this.utilisateur)
        this.productDialog3 = true;
        this.nom=this.utilisateur.prenom+' '+this.utilisateur.nom;
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
    Verif(){
        this.organisationService.getAllUsersEmail(this.utilisateur.email).subscribe(
            (data)=>{
                this.utilisateurexistant=data;
                if(this.utilisateurexistant){
                    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Cet utilisateur existe déja', life: 3000});
                }else{
                    this.saveUser()
                }
                this.utilisateurexistant = {};
            },
            (error)=>
            {
            })
    }
    saveUser() {
        this.submitted = true;
        console.log(this.utilisateur)
            if (this.utilisateur.nom.trim() && this.utilisateur.prenom.trim() && this.utilisateur.email.trim() && this.utilisateur.matricule.trim()) {
                if (this.utilisateur.id) {
                        this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisateur.id}`, this.utilisateur).subscribe((data) => {
                                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                                this.userSubject.next()
                                this.user = [...this.user];
                                this.productDialog = false;
                                this.productDialog2 = false;
                                this.existe = false;
                                this.structDialog = false;
                                this.utilisateur = {};
                            },
                            (error)=>
                            {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non modifié', life: 3000});
                            })
                }
                else {
                    this.http.post<Users>(environment.apiUrl+'/dg_User', this.utilisateur).subscribe((data) => {
                                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur Créé', life: 3000});
                                console.log(this.utilisateur)
                                this.userSubject.next()
                                this.user = [...this.user];
                                this.productDialog = false;
                                this.productDialog2 = false;
                                this.existe = false;
                                this.structDialog = false;
                                this.utilisateur = {};
                            },
                            (error)=>
                            {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non Créé', life: 3000});
                            })
                }
            }

    }
    saveUserprime() {
        this.submitted = true;
        console.log('Diago')
        console.log(this.utilisateur)
        console.log(this.utilisateur)
        console.log(environment.apiUrl+`/dg_User/${this.utilisateur.dg_structure.id}/${this.utilisateur.dg_fonction.id}/affectationUser`)
        this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisateur.dg_structure.id}/${this.utilisateur.dg_fonction.id}/affectationUser`, this.utilisateur).subscribe(data =>{
                console.log('Before')
                console.log(this.utilisateur)
                console.log('After')
                console.log(this.utilisateur)
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Fonction utilisateur modifié', life: 3000});
                this.userSubject.next();
            },
            (error)=>
            {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Fonction utilisateur Non modifié', life: 3000});
            })
        this.user = [...this.user];
        this.productDialog = false;
        this.productDialog2 = false;
        this.structDialog = false;
        this.utilisateur = {};

    }
    saveRole() {
        console.log(this.rol)
        this.http.post<Roles>(environment.apiUrl+'/dg_Role', this.rol).subscribe(data => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Role Créé', life: 3000});
                this.roleSubject.next();
            },
            (error)=>
            {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Role Non créé', life: 3000});
            })
    }
    UpdateRole(rol: Roles){
        this.Clonesrol=this.rol;
        this.rol = {...rol};
    }
    UpdateRoleSave(rol: Roles){
        if(this.rol){
            this.rol = {...rol};
            console.log(this.rol)
            this.http.put<Roles>(environment.apiUrl+`/dg_Role/${this.rol.id}`, this.rol).subscribe((data) =>{
                    this.messageService.add({severity:'success', summary: 'Success', detail:'Le role a été mis à jour'})
                    this.roleSubject.next();
                },
                (error)=>
                {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Role Non modifié', life: 3000});
                })
        }
        else{
            this.messageService.add({severity:'error', summary: 'Error', detail:'Role invalide'});
        }
    }
    Cancel(rol: Roles){
        this.rol= {...rol};
        this.rol=this.Clonesrol;
    }
    saveFonction(){
        this.http.post<Fonctions>(environment.apiUrl+'/dg_Fonction', this.fonctions).subscribe(data => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'La Fonction Créé', life: 3000});
                this.fonctionSubject.next();
            },
            (error)=>
            {this.messageService.add({severity: 'error', summary: 'Echec', detail: 'La fonction n\'a pas été créée', life: 3000});
            })
    }
    UpdateFonction(fonctions: Fonctions){
        this.fonctionsC=this.fonctions;
        this.fonctions = {...fonctions};
    }
    UpdateFonctionSave(fonctions: Fonctions){
        if(this.fonctions){
            this.fonctions = {...fonctions};
            console.log(this.fonctions)
            this.http.put<Fonctions>(environment.apiUrl+`/dg_Fonction/${this.fonctions.id}`, this.fonctions).subscribe((data) =>{
                    this.messageService.add({severity:'success', summary: 'Success', detail:'La fonction a été mis à jour'})
                    this.fonctionSubject.next();
                },
                (error)=>
                {this.messageService.add({severity: 'error', summary: 'Echec', detail: 'La fonction n\'a pas été mis à jour', life: 3000});
                })
        }
        else{
            this.messageService.add({severity:'error', summary: 'Error', detail:'Fonction invalide'});
        }
    }
    CancelF(fonctions: Fonctions){
        console.log(this.fonctionsP)
        console.log(this.fonction[this.fonctions.id])
        this.fonctions=this.fonctionsC;
    }
    filterDirections(event) {
        if(this.findRole(['ROLE_DER'])==true){
            this.directioon = this.directioon.filter(use => use.id === this.sauvegarde.Structure_Information.id);
            //this.directioon = this.directioon.filter(use => use.dg_typeStructure.libelle === "DRP");
       }
        else if(this.findRole(['ROLE_DRP'])==true){
            this.directioon = this.directioon.filter(use => use.id === this.sauvegarde.Structure_Information.id);
            //this.directioon = this.directioon.filter(use => use.dg_drp.id === this.sauvegarde.Structure_Information.dg_drp.id && use.dg_typeStructure.libelle === "BUREAU");
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
        this.directioon.sort((a,b) => a.libelle.localeCompare(b.libelle));
    }
    filterDirectionsbis(event) {
        const filtered: Structure[] = [];
        this.direction = this.directioon;
        this.direction = this.direction.filter(use => use.id === this.sauvegarde.Structure_Information.id);
        this.direction.sort((a,b) => a.libelle.localeCompare(b.libelle));
        const query = event.query;
        for (let i = 0; i < this.direction.length; i++) {
            const country = this.direction[i];
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
            }
        );
    }
    prevPage() {
        this.router.navigate(['/StructuresUsers/structures']);
    }
}
