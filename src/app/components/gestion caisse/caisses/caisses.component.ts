import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, of, Subject, tap } from 'rxjs';
import { Product } from 'src/app/api/product';
import { Caisse } from 'src/app/models/caisse';
import { Drp } from 'src/app/models/drp';
import { Structure } from 'src/app/models/structure';
import { StructureAnnexe } from 'src/app/models/structureAnnexe';
import { TypeCaisse } from 'src/app/models/typecaisse';
import { ProductService } from 'src/app/service/productservice';
import { UserconnecteService } from 'src/app/service/userconnecte.service';
import { environment } from 'src/environments/environment.prod';
import { StructureService } from '../../gestion organisation/services/structure.services';
import { CaisseService } from '../services/caisse.service';
import { TypeCaisseService } from '../services/type-caisse-service.service';

@Component({
    selector: 'app-caisses',
    templateUrl: './caisses.component.html',
    styleUrls: ['./caisses.component.scss'],
})
export class CaissesComponent implements OnInit {
    isAnnexe;

    isannexe;
    logo;
    test = new Date();
    _typecaisseSubject = new Subject<void>();
    _drpSubject = new Subject<void>();

    _caisseSubject = new Subject<void>();
    listannexe = new Subject<void>();
    listtypecaisse: TypeCaisse[];
    structureid;
    structure;
    dg_structure: Structure;
    libellestructure = <any>[];
    listCaisse;
    form;
    id;
    listhstocaisse;
    detailsDialog;
    detailsDialog2;
    annexeDialog;
    typecaisse;
    libellecaisse: any;
    histocaisse;
    histocaisseid;
    listcaissesannexe;
    structureAnnexe;
    typecaisseDialog;
    selectlibellestructure = '';
    selectedCaiss;
    libelle;
    editable: boolean;
    listStructure: Structure[];
    dg_struct: Structure;
    filteredCountries: Structure[];
    filteredCaisses: TypeCaisse[];
    dg_type_struct: TypeCaisse;
    structurejson;
    listdata = {};
    selectlibelleTypestructure = '';

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    annexechoisi;

    //caisses

    annexeDialogCaisse: boolean;
    caisseDialog: boolean;
    caisseDialog2: boolean;
    deleteCaisseDialog: boolean = false;
    deleteCaissesDialog: boolean = false;
    structureList;

    caisses: Caisse[];
    caisse: Caisse;

    selectedCaisses: Caisse[];
    annexe: StructureAnnexe;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    selectedType: any;

    listRoles;
    utilisateur;
    templiststructure;
    drpchoisi;
    listdrp: Drp[];
    listdrpfiltre: Drp[];
    liststructure: Structure[];
    liststructurefiltre: Structure[];
    listeCaisses;
    bureauxDrp;
    title2;
    champstructure = false;
    idDrp: number;
    idStruc: number;
    listbureauxDrp;
    idStructure;
    listbureaufiltre: Structure[];
    templistdrp:Drp[];
    tempCaisses;
    caisseStructure;
    structurechoisi: Structure;
    templisttypecaisse;
    @ViewChild('stepper') stepper: MatStepper;
    listtstruc: any;
    listCaisseRece: this;
    user: Object;
    mescaisses: Object;
    listAnnexefiltre: StructureAnnexe[];
    titre: string;
    title1: string;
    listhstocaisseAnnexe: Object;

    structureSubject = new Subject<void>();

    typeCaisseSubject = new Subject<void>();

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private caisseapi: CaisseService,
        private http: HttpClient,
        private keycloakservice: KeycloakService,
        private userconnecte: UserconnecteService
    ) {}

    ngOnInit() {
        this.isannexe = false;
        this.liststructure = [];

        this.caisseapi.caisseSubject.subscribe(() => {
            this.haveAllCaisse();
        });

        this.haveAllCaisse();

        this.AllStructure();

        this._drpSubject.subscribe(() => {
            this.haveAllDrp();
        });
        this.haveAllDrp();

        this._typecaisseSubject.subscribe(() => {
            this.http
                .get<TypeCaisse[]>(environment.apiUrl + '/dg_TypeCaisse/')
                .subscribe((data) => {
                    this.listtypecaisse = data;
                    this.templisttypecaisse = data;
                    console.log(this.listtypecaisse);
                });
        });

        this._typecaisseSubject.next();

        this.listannexe.subscribe(() => {
            /*if(this.structurechoisi==undefined || this.structurechoisi==null)
    {
      console.log("DHHJHD")
      this.haveAllStructureAnnexe2();
    }
    else{
      
      this.haveAllStructureAnnexe()
    }*/
        });

        this.listannexe.next();

        this.logo = localStorage.getItem('logo');
        this.AllStructure();
        this.AllTypeCaisse();
        this.haveAllDrp();

        this.listRoles =
            this.keycloakservice.getKeycloakInstance().realmAccess.roles;

        console.log(this.listRoles);
        console.log(this.keycloakservice.getKeycloakInstance());

        // #################### initialisation #########################

        this.structureSubject.subscribe(() => {
            this.http
                .get(environment.apiUrl + '/dg_Structure')
                .subscribe((data: any[]) => {
                    this.listStructure = data;
                    this.templiststructure=data
                    console.log(this.listStructure)

                    if (
                        this.listRoles.find(
                            (role) =>
                                role == 'ROLE_DRP' && role != 'ROLE_SUPERADMIN'
                        )
                    ) {
                        this.userconnecte.getUser().then((data) => {
                            this.utilisateur = data;

                            console.log(this.utilisateur);

                            this.idDrp =
                                this.utilisateur.dg_structure.dg_drp.id;
                            console.log(this.idDrp);
                            console.log(this.listStructure);

                            this.listStructure = this.listStructure.filter(
                                (structure) =>
                                    structure.dg_typeStructure?.id<= 2 &&
                                    structure.dg_drp.id == this.idDrp
                            );
                            this.templiststructure = this.listStructure;
                            console.log(this.templiststructure);
                            // console.log(this.caisse)

                            console.log(this.idDrp);
                            // this.userconnecte.getDrpById(this.idDrp).then
                            // (
                            //   (data)=>
                            //   {
                            //     this.bureauxDrp= data
                            //     console.log(this.bureauxDrp)

                            //    // this.liststructure=this.liststructure.filter(structure=>structure.dg_drp.id==this.bureauxDrp.dg_structure.libelle || structure.dg_structureAnnexe.bureau.id==this.bureauxDrp.dg_structureAnnexe.bureau.id)
                            //      //this.bureauxDrp=this.bureauxDrp.filter(burau=>burau.dg_structure==this.bureauxDrp.dg_structure.id)
                            //    // this.templiststructure=this.liststructure
                            //     console.log(this.bureauxDrp)

                            // }
                            // )
                            console.log(this.idDrp);
                            this.haveDrpById();
                        });
                    }
                    // if(this.listRoles.find(role=>role =="ROLE_SUPERADMIN" || role=="ROLE_ADMIN"))
                    // {

                    //   this.userconnecte.getUser().then
                    //   (
                    //     (data)=>{
                    //       this.utilisateur=data;
                    //       console.log(this.utilisateur);

                    //       this.idDrp=this.utilisateur.dg_structure.dg_drp.id
                    //       console.log(this.idDrp)
                    //       console.log( this.listStructure)

                    //       this.listStructure=this.listStructure.filter(structure=>structure.dg_typeStructure.id <=2)
                    //       this.templiststructure=this.listStructure
                    //       console.log(this.listStructure)
                    //       console.log(this.templiststructure)
                    //     })
                    //   }
                    if (
                        this.listRoles.find(
                            (role) =>
                                role == 'ROLE_RECEVEUR' ||
                                role == 'ROLE_RESPONSABLE_ANNEXE' ||
                                (role == 'ROLE_GRANDECAISSE' &&
                                    role != 'ROLE_DRP' &&
                                    role != 'ROLE_SUPERADMIN')
                        )
                    ) {
                        this.userconnecte.getUser().then((data) => {
                            this.utilisateur = data;
                            console.log(this.utilisateur.dg_structure.id);
                            this.idStructure = this.utilisateur.dg_structure.id;
                            console.log(this.idStructure);

                            // this.idDrp=this.utilisateur.dg_structure.dg_drp.id
                            // console.log(this.idDrp)
                            console.log(this.listStructure);
                            //  this.listStructure=this.listStructure.filter(structure=>structure.dg_drp.id==1)
                            this.listStructure = this.listStructure.filter(
                                (structure) => structure.dg_typeStructure.id < 3
                            );
                            this.templiststructure = this.listStructure;

                            console.log(this.listStructure);

                            this.title2 = this.utilisateur.dg_structure;

                            if (
                                this.listRoles.find(
                                    (role) =>
                                        role == 'ROLE_RESPONSABLE_ANNEXE' &&
                                        role != 'ROLE_RECEVEUR' &&
                                        role != 'ROLE_DRP' &&
                                        role != 'ROLE_SUPERADMIN'
                                )
                            ) {
                                this.isannexe = true;
                            }

                            console.log(this.title2);
                            console.log(this.idStructure);
                            this.haveCaisseByStructure();
                            //   this.haveAllStructureAnnexe2()
                            this.haveAllStructureAnnexe();
                        });

                        this._caisseSubject.next();
                    }
                });
        });

        this.structureSubject.next();

        //  this.userconnecte.getUser().then((data) =>
        //  {

        //  this.user=data
        //  console.log(this.dg_structure)
        //  }
        //  )

        this.haveAllStructureAnnexe();
    }

    filterbureau(event) {
        this.structureList = this.structureList.filter(
            struct =>struct.dg_typeStructure?.libelle
                    .toLowerCase()
                    .includes('bureau') == true
        );

        console.log(this.structureList);
        const filtered: Drp[] = [];
        const query = event.query;
        for (let i = 0; i < this.structureList.length; i++) {
            const Drp = this.structureList[i];
            //if (Drp.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(Drp);
            //}
        }
        this.listbureaufiltre = filtered;
        console.log(this.listbureaufiltre);
    }

    filterAnnexe(event) {
        console.log(this.structureAnnexe);
        const filtered: StructureAnnexe[] = [];
        const query = event.query;
        for (let i = 0; i < this.structureAnnexe.length; i++) {
            const annexe = this.structureAnnexe[i];
            if (
                annexe.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(annexe);
            }
        }

        this.listAnnexefiltre = filtered;
        console.log(this.listAnnexefiltre);
    }

    filterStructure(event) {
        console.log(this.listStructure);

        const filtered: Structure[] = [];
        const query = event.query;
        for (let i = 0; i < this.listStructure.length; i++) {
            const struc = this.listStructure[i];
            if (struc.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(struc);
            }
        }

        this.liststructurefiltre = filtered;
        console.log(this.liststructurefiltre);
    }

    // filterDrp(event) {
    //     console.log(this.listdrp);

    //     const filtered: Drp[] = [];
    //     const query = event.query;
    //     for (let i = 0; i < this.listdrp.length; i++) {
    //         const drp = this.listdrp[i];
    //         if (drp.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //             filtered.push(drp);
    //         }
    //     }

    //     this.listdrpfiltre = filtered;
    //     console.log(this.listdrpfiltre);
    // }

    haveAllCaisse() {
        this.caisseapi.getAllCaisse().subscribe((data) => {
            this.listCaisse = data;
            //console.log(this.listCaisse)
        });
    }

    AllStructure() {
        this.caisseapi.getAllStructure().subscribe((data) => {
            this.listStructure = data;
            console.log(this.listStructure);
            // for (let i of this.listStructure){
            //   if(i.dg_typeStructure?.libelle=="Bureau"){
            //     console.log(i.dg_typeStructure)
            //   //  let structureList=[];
            //     this.structureList.push(i.dg_typeStructure)
                
            //   }
              
            // }
            this.listStructure = this.listStructure.filter(use =>use.dg_typeStructure?.id <=1
            );
            console.log(this.listStructure);
           this.structureList=this.listStructure
        });
    }

    AllTypeCaisse() {
        this.caisseapi.getAllTypeCaisse().subscribe((data) => {
            this.listtypecaisse = data;
            this.templisttypecaisse = data;
            console.log(this.listtypecaisse);
        });
    }

    haveAllDrp() {
        this.http
            .get(environment.apiUrl + '/dg_Drp')
            .subscribe((data: any[]) => {
                this.listdrp = data;
                console.log(this.listdrp);
                this.listdrp = this.listdrp.filter(
                    drp => drp.libelle.toLowerCase().includes('service') == false
                );
                this.templistdrp = this.listdrp;
                console.log(this.listdrp);
            });
    }

    haveDrpById() {
        this.caisseapi.getDrpById(this.idDrp).subscribe((data) => {
            this.bureauxDrp = data;
            console.log(this.bureauxDrp);
            // console.log(this.listtstruc)
            // this.listtstruc=this.bureauxDrp.dg_structure
            // this.listtstruc= this.listtstruc.filter(structure =>structure.dg_typeStructure.id<=2)
            // console.log(this.listtstruc)
        });
    }
    haveCaisseByStructure() {
        console.log(this.idStructure);

        this._caisseSubject.subscribe(() => {
            this.caisseapi
                .getCaissesByStructure(this.idStructure)
                .subscribe((data) => {
                    this.listeCaisses = data;
                    console.log(this.caisseStructure);
                    this.caisseStructure = this.caisseStructure.filter(
                        (use) => use.dg_typeCaisse.id > 1
                    );
                });
        });

        this._caisseSubject.next();
    }

    haveAllStructureAnnexe() {
        console.log(this.drpchoisi);
        this.caisseapi.getAllStructureAnnex().subscribe((data) => {
            this.structureAnnexe = data;
            this.structureAnnexe = this.structureAnnexe.filter(
                (use) => use.bureau.id == this.idStructure
            );
            console.log(this.structureAnnexe);
        });
    }
    haveAllStructureAnnexe2() {
        console.log(this.structurechoisi);

        this.caisseapi.getAllStructureAnnex().subscribe((data) => {
            this.structureAnnexe = data;
            this.structureAnnexe = this.structureAnnexe.filter(
                (use) => use.bureau.id == this.structurechoisi.id
            );
            console.log(this.structureAnnexe);
        });
    }
    showDialog(annexe) {
        this.isAnnexe = true;
        this.annexeDialogCaisse = true;
        console.log(annexe);
        this.titre = this.annexe?.annexe.libelle;

        this.annexechoisi = annexe;

        this.http
            .get(
                environment.apiUrl + '/dg_Caisse/structure/' + annexe.annexe.id
            )
            .subscribe((data) => {
                this.listcaissesannexe = data;

                console.log(this.listcaissesannexe);
            });
    }

    choixbureauxDrp() {
        console.log(this.listbureauxDrp);
        console.log(this.bureauxDrp);

        this.bureauxDrp = this.bureauxDrp.filter(
            (drp) => drp.dg_structure.id == this.listbureauxDrp.id
        );
        this.liststructure = this.liststructure.filter(
            (structure) => structure.dg_typeStructure.id <= 2
        );
        console.log(this.listbureauxDrp);

        console.log(this.stepper);

        this.stepper.selected.completed = true;

        this.stepper.next();
    }

    choixStructure() {
        console.log(this.structurechoisi.id);

        this._caisseSubject.subscribe(() => {
            // if(this.utilisateur.roles[0].authority=="ROLE_DRP" || this.utilisateur.roles[0].authority=="ROLE_SUPERADMIN" || this.utilisateur.roles[0].authority=="ROLE_RECEVEUR"){
            this.caisseapi
                .getCaissesByStructure(this.structurechoisi.id)
                .subscribe((data) => {
                    this.listeCaisses = data;
                    this.title1 = this.structurechoisi.libelle;
                    console.log(this.title1);
                    console.log(this.listeCaisses);
                    // this.listeCaisses=this.listeCaisses.filter(caisse=>caisse.dg_typeCaisse.id==1)
                });
        });

        this._caisseSubject.next();

        this.caisseapi.getAllStructureAnnex().subscribe((data) => {
            this.structureAnnexe = data;
            this.structureAnnexe = this.structureAnnexe.filter(
                (use) => use.bureau.id == this.structurechoisi.id
            );
            console.log(this.structureAnnexe);
        });

        this.stepper.selected.completed = true;

        this.stepper.next();
    }

    choixDrp() {
        console.log(this.drpchoisi);
        console.log(this.structureList);

        //console.log(this.templiststructure);
        this.structurechoisi = null;
        this.listStructure = this.templiststructure;
        this.structureList = this.structureList.filter(
            structure => structure.dg_drp.id == this.drpchoisi.id
        );
        this.structureList = this.structureList.filter(structure => structure.dg_typeStructure?.id <= 2
        );

        console.log(this.stepper);

        this.stepper.selected.completed = true;

        this.stepper.next();
    }

    resetStepper() {
        this.listdrp = this.templistdrp;
        this.liststructure = this.templiststructure;
        this.caisses = this.tempCaisses;
        // this.users = this.usertemps;
        this.stepper.reset();
        this.ngOnInit();
    }

    findRole(listrole) {
        let retour = false;
        for (let rol1 of listrole) {
            if (this.listRoles.find((role) => role === rol1) != undefined) {
                retour = true;
            }
        }
        return retour;
    }

    openNew() {
        this.caisse = {};
        this.submitted = false;
        this.caisseDialog = true;

        this.caisse.dg_structure = this.structurechoisi;

        console.log(this.listeCaisses);
        console.log(this.listtypecaisse);

        this.listtypecaisse = this.templisttypecaisse;

        this.listtypecaisse = this.listtypecaisse.filter(
            (typecaisse) =>
                typecaisse.libelle.toLowerCase().includes('dcp') == false &&
                typecaisse.libelle.toLowerCase().includes('dfc') == false
        );

        if (
            this.listeCaisses.find(
                (caisse) =>
                    caisse.dg_typeCaisse.libelle
                        .toLowerCase()
                        .includes('receveur') == true
            ) != undefined
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('receveur') ==
                    false
            );
        }

        if (
            this.listeCaisses.find(
                (caisse) =>
                    caisse.dg_typeCaisse.libelle
                        .toLowerCase()
                        .includes('annexe') == true
            ) != undefined
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('annexe') == false
            );
        }

        if (
            this.structurechoisi.dg_typeStructure.libelle
                .toLowerCase()
                .includes('bureau') == true
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('annexe') == false
            );
        }
    }

    openNew2() {
        alert('HOOYAY');
        this.caisse = {};
        this.caisse.dg_structure = {};
        this.submitted = false;
        this.caisseDialog = true;

        this.caisse.dg_structure.id = this.annexechoisi.annexe.id;

        this.listtypecaisse = this.templisttypecaisse;

        if (
            this.listcaissesannexe.find(
                (caisse) =>
                    caisse.dg_typeCaisse.libelle
                        .toLowerCase()
                        .includes('annexe') == true
            ) != undefined
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('annexe') == false
            );
        }

        this.listtypecaisse = this.listtypecaisse.filter(
            (typecaisse) =>
                typecaisse.libelle.toLowerCase().includes('receveur') == false
        );
    }

    deleteSelectedCaisse() {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de supprimer cette Caisse?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.caisse = this.listCaisse.filter(
                    (val) => !this.selectedCaisses.includes(val)
                );
                this.caisse = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Structures Supprimées',
                    life: 3000,
                });
            },
        });
    }

    editCaisse(caisse) {
        this.caisse = { ...caisse };

        this.dg_struct = caisse.dg_structure;
        this.dg_type_struct = caisse.dg_typeCaisse;
        this.libellecaisse = caisse.dg_typeCaisse.libelle;

        this.listtypecaisse = this.templisttypecaisse;

        if (
            this.listeCaisses.find(
                (caisse) =>
                    caisse.dg_typeCaisse.libelle
                        .toLowerCase()
                        .includes('receveur') == true
            ) != undefined
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('receveur') ==
                    false
            );
        }

        if (
            this.listeCaisses.find(
                (caisse) =>
                    caisse.dg_typeCaisse.libelle
                        .toLowerCase()
                        .includes('annexe') == true
            ) != undefined
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('annexe') == false
            );
        }

        if (
            this.structurechoisi.dg_typeStructure.libelle
                .toLowerCase()
                .includes('bureau') == true
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('annexe') == false
            );
        }

        this.caisseDialog2 = true;
    }

    editCaisse2(caisse) {
        this.caisse = { ...caisse };

        this.dg_struct = caisse.dg_structure;
        this.dg_type_struct = caisse.dg_typeCaisse;
        this.libellecaisse = caisse.dg_typeCaisse.libelle;

        this.listtypecaisse = this.templisttypecaisse;

        if (
            this.listcaissesannexe.find(
                (caisse) =>
                    caisse.dg_typeCaisse.libelle
                        .toLowerCase()
                        .includes('annexe') == true
            ) != undefined
        ) {
            this.listtypecaisse = this.listtypecaisse.filter(
                (typecaisse) =>
                    typecaisse.libelle.toLowerCase().includes('annexe') == false
            );
        }

        this.listtypecaisse = this.listtypecaisse.filter(
            (typecaisse) =>
                typecaisse.libelle.toLowerCase().includes('receveur') == false
        );

        this.caisseDialog2 = true;
    }

    //
    saveCaisse() {
        this.submitted = true;
        if (this.caisse.libelle.trim()) {
            if (this.caisse.id) {
                this.http
                    .put<Caisse>(
                        environment.apiUrl + '/dg_Caisse/' + this.caisse.id,
                        this.caisse
                    )
                    .subscribe(
                        (data) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'caisse modifiée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'caisse non modifiée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                        }
                    );
            } else {
                console.log(this.caisse);

                console.log(this.annexechoisi);

                this.http
                    .post<Caisse>(
                        environment.apiUrl + '/dg_Caisse',
                        this.caisse
                    )
                    .subscribe(
                        (data) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'caisse créée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                            this.structureSubject.next();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'caisse non créée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                            this.structureSubject.next();
                        }
                    );
            }

            this.productDialog = false;
            this.caisseDialog2 = false;
            this.caisseDialog = false;
            this.caisse = {};
        }
    }

    saveCaisse2() {
        this.submitted = true;
        if (this.caisse.libelle.trim()) {
            if (this.caisse.id) {
                this.http
                    .put<Caisse>(
                        environment.apiUrl + '/dg_Caisse/' + this.caisse.id,
                        this.caisse
                    )
                    .pipe(
                        tap(() => {
                            this._caisseSubject.next();
                            console.log('modifié avec success');
                        }),
                        catchError((err) => of([]))
                    )
                    .subscribe(
                        (data) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'caisse modifiée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'caisse non modifiée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                        }
                    );
            } else {
                console.log(this.caisse);

                this.http
                    .post<Caisse>(
                        environment.apiUrl + '/dg_Caisse',
                        this.caisse
                    )
                    .pipe(
                        tap(() => {
                            this._caisseSubject.next();
                            console.log('insertion avec success');
                        }),
                        catchError((err) => of([]))
                    )
                    .subscribe(
                        (data) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'caisse créée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                        },
                        (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'caisse non créée',
                                life: 3000,
                            });
                            this._caisseSubject.next();
                        }
                    );
            }

            this.caisses = { ...this.caisses };
            this.productDialog = false;
            this.caisseDialog2 = false;
            this.caisseDialog = false;
            this.caisse = {};
        }
    }

    deleteCaisse(caisse: Caisse) {
        this.deleteCaisseDialog = true;
        this.caisse = { ...caisse };
    }

    confirmDelete() {
        this.deleteCaisseDialog = false;
        this.caisses = this.caisses.filter((val) => val.id !== this.caisse.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'caisse Deleted',
            life: 3000,
        });
        this.caisse = {};
    }

    hideDialog() {
        this.caisseDialog = false;
        this.caisseDialog2 = false;
        this.submitted = false;
    }

    openTypecaisse() {
        this.typecaisse = {};
        this.submitted = false;
        this.typecaisseDialog = true;
    }

    ajoutTypeCaisse() {
        this.submitted = true;
        if (this.typecaisse.libelle != null) {
            this.http
                .post(environment.apiUrl + '/dg_TypeCaisse/', this.typecaisse)
                .pipe(
                    tap(() => {
                        this._typecaisseSubject.next();
                    }),
                    catchError((err) => of([]))
                )
                .subscribe((data) => {
                    console.log('ajouter succèss');
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: ' "ajouter succèss',
                        life: 300,
                    });
                });
        }
        this.typecaisse = { ...this.typecaisse };
    }

    editTypecaisse(typecaisse) {
        this.typecaisse = { ...typecaisse };
    }

    saveTypecaisse(typecaisse) {
        this.submitted = true;
        if (this.typecaisse.libelle != '') {
            this.http
                .put(
                    environment.apiUrl + '/dg_TypeCaisse/' + this.typecaisse.id,
                    this.typecaisse
                )
                .pipe(
                    tap(() => {
                        this._typecaisseSubject.next();
                    }),
                    catchError((err) => of([]))
                )
                .subscribe((data) => {
                    console.log('yeshh');
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: ' "éditer avec succèss',
                        life: 300,
                    });
                });
        }
    }

    deleteTypecaisse(typecaisse) {
        this.submitted = true;
        this.http
            .delete(environment.apiUrl + '/dg_TypeCaisse/' + typecaisse.id)
            .pipe(
                tap(() => {
                    this._typecaisseSubject.next();
                }),
                catchError((err) => of([]))
            )
            .subscribe((data) => {
                console.log('yeshh');
            });
    }

    openDetails(caisse) {
        this.caisse = { ...caisse };
        console.log(caisse);

        this.http
            .get(
                environment.apiUrl + '/dg_HistoriqueCaisse/caisse/' + caisse.id
            )
            .subscribe((data) => {
                this.listhstocaisse = data;
                console.log(this.listhstocaisse);
            });
        this.detailsDialog = true;
    }

    openDetails2(annexe) {
        this.annexe = { ...annexe };
        console.log(annexe);

        this.http
            .get(
                environment.apiUrl + '/dg_HistoriqueCaisse/caisse/' + annexe.id
            )
            .subscribe((data) => {
                this.listhstocaisseAnnexe = data;
                console.log(this.listhstocaisseAnnexe);
            });
        this.detailsDialog2 = true;
    }

    openAnnexe(structureAnnexe) {
        this.structureAnnexe = { ...structureAnnexe };
        console.log(structureAnnexe);
        for (let index = 0; index < structureAnnexe.length; index++) {
            console.log(structureAnnexe[index].annexe.libelle);
        }
        this.annexeDialog = true;
    }
    filterCountry(event) {
        const filtered: Structure[] = [];
        const query = event.query;
        for (let i = 0; i < this.listStructure.length; i++) {
            const country = this.listStructure[i];
            if (
                country.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    filtercaisse(event) {
        // console.log(this.listtypecaisse)
        const filtered: Caisse[] = [];
        const query = event.query;
        for (let i = 0; i < this.listtypecaisse.length; i++) {
            const caisse = this.listtypecaisse[i];
            if (
                caisse.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0
            ) {
                filtered.push(caisse);
            }
        }

        this.filteredCaisses = filtered;
        //this.filteredCaisses =this.filteredCaisses.filter(use=>use)
        console.log(this.filteredCaisses);
    }

    // openHistorique()
    // {
    //   this.caisseapi.getUserByCaisse(this.histocaisseid).subscribe((data)=>{
    //     this.histocaisse=data
    //     console.log(this.histocaisse)

    //   })
    //   this.detailsDialog=true
    // }
}
