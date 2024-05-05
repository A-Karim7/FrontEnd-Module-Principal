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
import { OrganisationService } from "../../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
  selector: 'app-agent-annexe',
  templateUrl: './agent-annexe.component.html',
  styleUrls: ['./agent-annexe.component.scss']
})
export class AgentAnnexeComponent implements OnInit {

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
    attente: boolean;
    nombre:number;
    titre: string;
    nom: string;
    titre2: string;
    cols: any[];
    listRoles;

    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        this.organisationService.getAllUsersEmail(this.keycloakservice.getKeycloakInstance().profile.username).subscribe(
            (data)=>{
                this.utilisateur=data;
                //this.sauvegarde.Users_rcv_Information=this.utilisateur;
                //this.sauvegarde.Structure_rcv_Information=this.utilisateur.dg_structure;
                console.log(this.utilisateur)
            }
        );
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
                this.user = this.user.filter(use => use.dg_structure.id === this.utilisateur.dg_structure.id);
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
            }
        )

    }
    haveAllUser() {
        this.organisationService.getAllUsers().subscribe (
            (data:Users[])=>
            {
                this.user = data;
                this.user = this.user.filter(use => use.dg_structure.id === this.utilisateur.dg_structure.id);

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

    saveUser() {
        this.submitted = true;
        console.log(this.utilisateur)
        console.log(this.utilisateur)
        if (this.utilisateur.nom.trim() && this.utilisateur.prenom.trim() && this.utilisateur.email.trim() && this.utilisateur.matricule.trim()) {
            if (this.utilisateur.id) {
                this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisateur.id}`, this.utilisateur).subscribe((data) => {
                        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                        this.userSubject.next()
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

                    },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non Créé', life: 3000});
                    })
            }
        }

        this.user = [...this.user];
        this.productDialog = false;
        this.productDialog2 = false;
        this.structDialog = false;
        this.utilisateur = {};
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
    filterDirectionsbis(event) {
        this.direction = this.directioon;
        this.direction = this.direction.filter(use => use.id === this.utilisateur.dg_structure.id);
        const filtered: Structure[] = [];
        const query = event.query;
        for (let i = 0; i < this.direction.length; i++) {
            const country = this.direction[i];
            if (country.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filtereddirections = filtered;
    }
    filterDirections(event) {
        const filtered: Structure[] = [];
        const query = event.query;
        this.directioon = this.directioon.filter(use => use.dg_drp.id === this.utilisateur.dg_structure.dg_drp.id && (use.dg_typeStructure.libelle === "Bureau" || use.dg_typeStructure.libelle === "Annexe"));
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
            this.annexes = this.annexes.filter(use => use.bureau.id === this.utilisateur.dg_structure.id);
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
        this.router.navigate(['/Users_bureau/Structures']);
    }
}
