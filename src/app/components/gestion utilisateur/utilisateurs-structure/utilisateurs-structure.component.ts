import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/api/product';
import { Drp } from 'src/app/models/drp';
import { Fonctions } from 'src/app/models/fonctions';
import { Modif } from 'src/app/models/modif';
import { Roles } from 'src/app/models/roles';
import { Structure } from 'src/app/models/structure';
import { Users } from 'src/app/models/users';
import { ProductService } from 'src/app/service/productservice';
import { environment } from 'src/environments/environment.prod';
import { OrganisationService } from '../services/organisation.service';

@Component({
  selector: 'app-utilisateurs-structure',
  templateUrl: './utilisateurs-structure.component.html',
  styleUrls: ['./utilisateurs-structure.component.scss']
})
export class UtilisateursStructureComponent implements OnInit {
  productDialog: boolean;
    productDialog2: boolean;
    productDialog3: boolean;
    structDialog: boolean;
    RolesDialog: boolean;
    FonctionDialog: boolean;

    cities: any[];


    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];


    product: Product;

    selectedProducts: Product[];


    // Drp


    directionsDialog: boolean;

    deletedirectionsDialog: boolean = false;

    deletedirectioonDialog: boolean = false;

    drps: Drp[];

    drp: Drp;

    selecteddirectioon: Drp[];

    directioon: Structure[];
    direct: Structure[];
    roles: Roles[];
    id:number;
    dg_fonction:Fonctions;
    fonction: Fonctions[];
    fonctions: Fonctions;
    fonctionsC: Fonctions;
    fonctionsP: Fonctions;
    filtereddirections: Structure[];
    filteredfonctions:Structure[];
    filteredroles:Structure[];
    directioon$!: Observable<Structure[]>;
    structure: Structure;
    structurs: Structure[];
    historique: Modif;

    userSubject = new Subject<void>();
    fonctionSubject = new Subject<void>();
    roleSubject = new Subject<void>();
    user : Users[];
    usertemp : Users[];
    usertemp2 : Users[];
    usere : Users[];
    utilisatreur: Users;
    utilisateur: Users;
    rol: Roles;
    Clonesrol: Roles;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    options = [];
    memo: number;
    memo1: number;
    rec: number;

    UserStructure 

    AllUser
    listRoles;

    listuserAnnexe
    structureUser

    userConnecte = JSON.parse(localStorage.getItem('user'));
 



    listUserInAnnexe


    constructor(private http: HttpClient,private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private organisationService: OrganisationService,private keycloakservice: KeycloakService, ) {
    }

    ngOnInit() {
        this.listUserInAnnexe=[]

        this.AllUser=[]
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        console.log(this.keycloakservice.getKeycloakInstance().realmAccess.roles)
        this.usere=[];
        this.organisationService.getAllUsersEmail(this.keycloakservice.getKeycloakInstance().profile.username).subscribe(
            (data)=>{
                this.utilisateur=data;


  
                console.log(this.utilisateur)
                console.log(this.utilisateur.dg_structure.id)
                this.memo=this.utilisateur.dg_structure.dg_drp.id;
                this.memo1=this.utilisateur.dg_structure.id;

                this.http.get(environment.apiUrl+"/dg_Structure?libelle=='Drp Dakar'").subscribe
                (
                  (data)=>
                  {
                    console.log(data)
                  }
                )


                this.http.get(environment.apiUrl+'/dg_User/').subscribe(
                    (data)=>{

                        this.AllUser=data

                      this.UserStructure=data

                      this.UserStructure=this.UserStructure.filter(user=>user.dg_structure.id==this.memo1)
                      console.log(this.UserStructure)
                    }
                )

            }
        );
        this.organisationService.getAllRoles().subscribe(
            (data)=>{
                this.roles=data;
            }
        );
        this.organisationService.getAllDirections().subscribe(
            (data)=>{
                this.directioon=data;
                this.filtrebis()
            }
        );
        this.organisationService.getAllFonctions().subscribe(
            (data)=>{
                this.fonction=data;
            }
        );
        this.productService.getProducts().then(data => this.products = data);
        this.organisationService.getAllUsers().subscribe(
            (data)=>{
                this.usertemp=data;
                this.usertemp2=data;
                this.filtre()
                setTimeout(function (){
                    this.user=this.usertemp
                },1000)
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

        this.http.get(environment.apiUrl+'/dg_Structure/'+this.userConnecte.dg_structure.id).subscribe(
            (data)=>
            {
                this.structureUser=data

                let dummy

                if(this.structureUser.dg_structureBureau.length!=0)
                {

                    console.log(this.structureUser.dg_structureBureau)

                    for(let annexe of this.structureUser.dg_structureBureau)
                    {
                        dummy=this.AllUser.filter(user=>user.dg_structure.id==annexe.annexe.id)
                        this.listUserInAnnexe.push(dummy)
                    }
                
                  
                    console.log(this.listUserInAnnexe)
                }
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
    haveAllRole() {
        this.organisationService.getAllRoles().subscribe (

            (data:Users[])=>
            {
                this.roles=data
            }
        )

    }
    haveAllUser() {
        this.organisationService.getAllUsers().subscribe (
            (data:Users[])=>
            {
                this.usertemp=data;
                this.filtre()
                setTimeout(function (){
                    this.user=this.usertemp
                },100)

            }
        )
    }

    openNew() {
        this.utilisatreur = {};
        this.submitted = false;
        this.productDialog = true;
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
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editUser(utilisatreur: Users) {
        this.utilisatreur = {...utilisatreur};
        this.productDialog2 = true;
    }
    editStru(utilisatreur: Users) {
        this.utilisateur = utilisatreur;
        this.utilisatreur = {...utilisatreur};
        this.structDialog = true;
    }
    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.productDialog2= false;
        this.productDialog3= false;
        this.structDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
        console.log(this.utilisatreur)
        console.log(this.utilisateur)

        if (this.utilisatreur.nom.trim()) {
            if (this.utilisatreur.id) {
                this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisatreur.id}`, this.utilisatreur).subscribe((data) => {
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                this.userSubject.next()
            },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non modifié', life: 3000});
                    })
            }
            else {
                this.http.post<Users>(environment.apiUrl+'/dg_User', this.utilisatreur).subscribe((data) => {
                    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur Créé', life: 3000});
                        console.log(this.utilisateur)
                        this.userSubject.next()

                },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non Créé', life: 3000});
                    })
            }
            this.user = [...this.user];
            this.productDialog = false;
            this.productDialog2 = false;
            this.structDialog = false;
            this.utilisatreur = {};
        }
    }
    saveUserprime() {
            this.submitted = true;
            console.log('Diago')
            console.log(this.utilisateur)
            console.log(this.utilisatreur)
            console.log(environment.apiUrl+`/dg_User/${this.utilisatreur.dg_structure.id}/${this.utilisatreur.dg_fonction.id}/affectationUser`)
            this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisatreur.dg_structure.id}/${this.utilisatreur.dg_fonction.id}/affectationUser`, this.utilisateur).subscribe(data =>{
            console.log('Before')
            console.log(this.utilisateur)
            console.log('After')
            console.log(this.utilisatreur)
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
            this.utilisatreur = {};

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
    Historique(utilisatreur: Users){
        this.utilisatreur = utilisatreur;
        console.log(this.utilisatreur)
        this.productDialog3 = true;
        this.organisationService.getModifUser(this.utilisatreur.id).subscribe(
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
        if(this.findRole(['ROLE_DRP'])==true){
            this.usertemp = this.usertemp.filter(use => use.dg_structure.id === this.utilisateur.dg_structure.id);
            this.user=this.usertemp;
            this.usertemp = this.usertemp.filter(use => use.dg_structure.dg_drp.id === this.memo);
            this.user=this.usertemp;
        }
        else if(this.findRole(['ROLE_RECEVEUR'])==true) {
            this.usertemp = this.usertemp.filter(use => use.dg_structure.id === this.utilisateur.dg_structure.id);
            this.user=this.usertemp;
            this.structurs=[]
            this.directioon=this.directioon.filter(str => str.id === this.utilisateur.dg_structure.id)
            console.log(this.directioon)
            this.structure=this.directioon[0];
            this.rec=this.structure.dg_structureBureau.length
            for (let a = 0; a < this.rec; a++) {
                this.structurs[a] = this.structure.dg_structureBureau[a].annexe
                console.log(this.structurs)
            }
            for (let ka = 0; ka < this.structurs.length; ka++) {
                this.usertemp2 = this.usertemp2.filter(use => use.dg_structure.id === this.structurs[ka].id);
               console.log(this.usertemp2)
            }
            //this.user=this.usertemp2;

        }
        else{
            this.organisationService.getAllUsers().subscribe (

                (data:Users[])=>
                {
                    this.user=data
                }
            )
        }
    }
    filtrebis(){
        if(this.findRole(['ROLE_DRP'])==true){
            this.directioon = this.directioon.filter(use => use.dg_drp.id === this.utilisateur.dg_structure.dg_drp.id);
            console.log(this.directioon)
        }
        else if(this.findRole(['ROLE_DER'])==true){
            this.directioon = this.directioon.filter(use => use.dg_typeStructure.libelle === "DRP");
            console.log(this.directioon)
        }
    }
    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    filterDirections(event) {
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
    filterRoles(event) {
        const filtered: Roles[] = [];
        const query = event.query;
        for (let i = 0; i < this.roles.length; i++) {
            const country = this.roles[i];
            if (country.authority.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredroles = filtered;
    }/*
    filterRoles(event) {
        const filtered: Roles[] = [];
        let userrole :any={};
        const query = event.query;
        for (let i = 0; i < this.roles.length; i++) {
            const role = this.roles[i];
            if (role.authority.toLowerCase().indexOf(query.toLowerCase()) == 0) {
               userrole.dg_role=role;
               userrole.dg_user=this.utilisatreur

                filtered.push(userrole)
            }
        }

        this.filteredroles=filtered

        console.log(this.filteredroles)
    }*/
}
