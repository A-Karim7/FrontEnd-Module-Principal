import {Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";

import {Sauvegarde} from "./Sauvegarde";

import {formatDate} from "@angular/common";
import { Roles } from "src/app/models/roles";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../services/organisation.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import { environment } from "src/environments/environment.prod";
import { Subject } from "rxjs";
import { KeycloakService } from "keycloak-angular";

@Component({
    selector: 'app-roles',
    template:`

    <p-toast position="center" key="c"></p-toast>

        <div class="col-12 lg:col-8">
            <div class="card">
                <h5 *ngIf="utilisateur">Affectation role pour {{utilisateur.prenom}} {{utilisateur.nom}} ({{utilisateur.matricule}})</h5>
                <p-pickList [source]="roles" [target]="targetroles" sourceHeader="From" targetHeader="To"
                            dragdrop="true"
                            [responsive]="true" [sourceStyle]="{'height':'250px'}" [targetStyle]="{'height':'250px'}">
                    <ng-template let-role pTemplate="item">
                        <div *ngIf="role">{{role.authority}}</div>
                        <div *ngIf="!role"></div>
                    </ng-template>
                </p-pickList>
                <br> <br>
                <div class="p-formgrid grid">
                    <div class="col-md-2 mr-auto">
                        <p-button label="Précèdent" (onClick)="prevPage()" icon="pi pi-angle-left" iconPos="left" class="p-toolbar-group-right"></p-button>
                    </div>
                    <div class="col-md-1" style="margin-right:10px;">
                        <button pButton pRipple type="button" label="Valider" align="right" class="p-button-success mr-2 mb-2" (click)="Affecter()" iconPos="right"></button>
                    </div>
                </div>

        </div>
        </div>`
})


export class RolesComponent implements OnInit {
    k:number;
    plus:number;
    mini:number;
    a:number;
    z:number;
    test:number;
    test2:number;
    testadd:any;
    userrole:  any;
    suppuserrole:  any;
    lastsupp:any;
    user: Users[];
    roles: Roles[];
    role: Roles[];
    ro: Roles[];
    utilisateur:Users;
    utili:Users;
    targetroles: Roles[];
    newtargetroles: Roles[];

    userSelected
    listUserStructure?:any[]
    structure
    roleSubject = new Subject<void>();
    listRoles;

    isaffected
    isdesaffected
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router, private http: HttpClient ,private messageService: MessageService,private keycloakservice: KeycloakService, private confirmationService: ConfirmationService) { }

    ngOnInit() {

        this.isaffected=false
        this.isdesaffected=false
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        this.utili={}
        this.roles=[]
        this.suppuserrole=[]
        this.testadd=[]
        this.userrole=[]
        this.lastsupp=[]
        if(!this.sauvegarde.Users_Information || this.sauvegarde.Users_Information=={}){
            this.router.navigate(['utilisateurs/attributionroles/structures']);


        }
this.userSelected=this.sauvegarde.Users_Information



        this.utilisateur=this.sauvegarde.Users_Information;
        console.log(this.utilisateur)



        this.http.get(environment.apiUrl+'/dg_User/structure/'+this.userSelected.dg_structure.id).subscribe
        (
            (data:any[])=>
            {
                this.listUserStructure=data
                console.log(this.listUserStructure)



            }

        )

        this.http.get(environment.apiUrl+'/dg_Structure/'+this.userSelected.dg_structure.id).subscribe
        (
            (data:any[])=>
            {
                this.structure=data
                console.log(this.structure)



            }

        )


        this.organisationService.getAllRoles().subscribe(
            (data)=>{
                this.roles = data;
                for(let l = 0; l < this.sauvegarde.Users_Information.roles.length; l++){
                    this.roles = this.roles.filter(use => use.authority !== this.sauvegarde.Users_Information.roles[l].authority);
                }
                this.filtre()
            }
        );
        this.organisationService.getAllUsersId(this.utilisateur.id).subscribe((data)=>{
                this.utili=data;
            }
        )
        this.targetroles=this.sauvegarde.Users_Information.roles;
        this.newtargetroles=this.targetroles;
        this.roleSubject.subscribe
        ( (data)=>
            {
                this.haveAllRole();
            }
        )
        this.haveAllRole();
    }

    filtre(){
        if(this.findRole(['ROLE_DER'])==true){
            this.roles = this.roles.filter(use => use.authority === "ROLE_DRP" || use.authority =="ROLE_CE" || use.authority =="ROLE_AFFGEN" || use.authority =="ROLE_CF" || use.authority =="ROLE_CELLCOM");
        }
        else if(this.findRole(['ROLE_DRP'])==true){

            console.log("isDRP")

            let foundReceveur =0

            let foundAnnexe =0

            if(this.structure.dg_typeStructure.id==1 )



            {
                console.log("HJKD")
                for(let user of this.listUserStructure)
                {
                    for(let role of user.roles)
                    {

                        if(role.authority=="ROLE_RECEVEUR")
                        {
            console.log("FOUND")

                            foundReceveur=1
                        }

                    }
                }

                    if(foundReceveur!=1 && foundReceveur !=0)

                    {
                        foundReceveur=2
                    }

                if(foundReceveur==1)
                {
                    this.roles = this.roles.filter(use =>  use.authority === "ROLE_RECEVEUR" ||  use.authority === "ROLE_GRANDECAISSE" || use.authority === "ROLE_CONTROLEUR" || use.authority === "ROLE_GUICHET" || use.authority === "ROLE_COMPTABILITE" || use.authority === "ROLE_ARRIERE" || use.authority === "ROLE_CABINE");
                    console.log(this.roles)
                }

                if(foundReceveur==2)
                {
                    this.roles = this.roles.filter(use =>  use.authority === "ROLE_RECEVEUR" || "ROLE_GRANDECAISSE" || use.authority === "ROLE_CONTROLEUR" || use.authority === "ROLE_GUICHET" || use.authority === "ROLE_COMPTABILITE" || use.authority === "ROLE_ARRIERE" || use.authority === "ROLE_CABINE");

                }


            }

            if(this.structure.dg_typeStructure.id==3 )



            {
                console.log("HJKD")
                for(let user of this.listUserStructure)
                {
                    for(let role of user.roles)
                    {

                        if(role.authority=="ROLE_RESPONSABLE_ANNEXE")
                        {
            console.log("FOUND")

                            foundAnnexe=1
                        }

                    }
                }

                    if(foundAnnexe!=1 && foundAnnexe !=0)

                    {
                        foundAnnexe=2
                    }

                if(foundAnnexe==1)
                {
                    this.roles = this.roles.filter(use =>   use.authority === "ROLE_CONTROLEUR" || use.authority === "ROLE_GUICHET" || use.authority === "ROLE_COMPTABILITE" || use.authority === "ROLE_ARRIERE" || use.authority === "ROLE_CABINE");
                    console.log(this.roles)
                }

                if(foundReceveur==2)
                {
                    this.roles = this.roles.filter(use =>  use.authority === "ROLE_RESPONSABLE_ANNEXE" || use.authority === "ROLE_CONTROLEUR" || use.authority === "ROLE_GUICHET" || use.authority === "ROLE_COMPTABILITE" || use.authority === "ROLE_ARRIERE" || use.authority === "ROLE_CABINE");

                }


            }








        }
        else if(this.findRole(['ROLE_RECEVEUR'])==true){
            this.roles = this.roles.filter(use => use.authority == "ROLE_GUICHET" || use.authority =="ROLE_ARRIERE" || use.authority =="ROLE_GRANDECAISSE" || use.authority =="ROLE_RESPONSABLE_ANNEXE");
        }
        else if(this.findRole(['ROLE_GRANDECAISSE'])==true){
            this.roles = this.roles.filter(use => use.authority == "ROLE_GUICHET" || use.authority =="ROLE_ARRIERE");
        }
        else if(this.findRole(['ROLE_RESPONSABLE_ANNEXE'])==true){
            this.roles = this.roles.filter(use => use.authority == "ROLE_GUICHET" || use.authority =="ROLE_ARRIERE");
        }
        else{
        }
    }

    haveAllRole() {
        this.organisationService.getAllUsersId(this.utilisateur.id).subscribe((data)=>{
            this.utili=data;
        }
        )
        this.targetroles=this.sauvegarde.Users_Information.roles;
    }
    prevPage() {
        this.router.navigate(['utilisateurs/attributionroles/users']);
    }
    Affecter() {
        this.a=0;
        this.test=this.utili.roles.length;
        this.test2=this.newtargetroles.length;
        console.log('Verification')
        console.log(this.newtargetroles)
        console.log(this.test)
        if(this.utili.roles.length==0){
            this.Affectation()
        }
        else {
            let that= this
            this.Desaffectation()
            setTimeout(function (){
                that.Affectation()

            },1000)
                }
        }
    Desaffectation(){
        this.isdesaffected==false
        for(let k=0; k<this.test; k++){
            this.suppuserrole[k]={}
            this.suppuserrole[k].dg_role={}
            this.suppuserrole[k].dg_user={}
            this.suppuserrole[k].dg_role=this.utili.roles[k];
            this.suppuserrole[k].dg_user=this.utilisateur;
            this.lastsupp[k]=this.suppuserrole;
        }
        console.log("Bismillah")
        console.log(this.lastsupp[0])
        console.log("Delete")
        this.http.patch(`${environment.apiUrl}/dg_UserRole/deleteGroupRoleToUser`, this.lastsupp[0]).subscribe((data) => {
            this.isdesaffected==true

            if(this.isdesaffected==true && this.isaffected==false)
            {


                this.messageService.add({key: 'c',severity: 'success', summary: 'Successful', detail: 'Operation réussi', life: 3000});
            }
                console.log(this.lastsupp[0]);



                this.roleSubject.next();

            },
            (error)=>
            {this.messageService.add({key: 'c',severity: 'error', summary: 'Erreur', detail: 'Désaffectation Non réussi', life: 3000});
                console.log(this.lastsupp[0]);
            })
    }
    Affectation(){
        this.isaffected=false

        for(let v=0; v<this.test2; v++){
            this.testadd[v]={}
            this.testadd[v].dg_role={}
            this.testadd[v].dg_user={}
            this.testadd[v].dg_role=this.newtargetroles[v];
            this.testadd[v].dg_user=this.utilisateur;
            this.userrole[v]=this.testadd;
        }
        console.log("Bismillah")
        console.log(this.userrole)
        console.log("Creer")
        this.http.post(environment.apiUrl+'/dg_UserRole/affectGroupRoleToUser', this.userrole[0]).subscribe(data => {


                this.isaffected=true

                this.messageService.add({key: 'c',severity: 'success', summary: 'Successful', detail: 'Affectation réussi', life: 3000});
                console.log(this.userrole[0]);
                this.roleSubject.next();
            },
            (error)=>
            {this.messageService.add({key: 'c',severity: 'error', summary: 'Erreur', detail: 'Affectation Non réussi', life: 3000});
                console.log(this.userrole[0]);
            })


            console.log(this.isaffected)
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
}

