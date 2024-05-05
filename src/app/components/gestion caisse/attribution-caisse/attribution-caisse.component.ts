import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { KeycloakService } from 'keycloak-angular';
import {
    ConfirmationService,
    ConfirmEventType,
    MessageService,
} from 'primeng/api';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/api/product';
import { Caisse } from 'src/app/models/caisse';
import { Drp } from 'src/app/models/drp';
import { HistoriqueCaisse } from 'src/app/models/historiqueCaisse';
import { Structure } from 'src/app/models/structure';
import { TypeCaisse } from 'src/app/models/typecaisse';
import { TypeStructure } from 'src/app/models/typeStructure';
import { ProductService } from 'src/app/service/productservice';
import { UserconnecteService } from 'src/app/service/userconnecte.service';
import { environment } from 'src/environments/environment.prod';
import { DrpService } from '../../gestion organisation/services/drp.services';
import { StructureService } from '../../gestion organisation/services/structure.services';
import { TypeStructureService } from '../../gestion organisation/services/typeStructure.services';
import { CaisseService } from '../services/caisse.service';
import { HistoriqueCaisseService } from '../services/historiquecaisse.service';
import { TypeCaisseService } from '../services/type-caisse-service.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-attribution-caisse',
    templateUrl: './attribution-caisse.component.html',
    styleUrls: ['./attribution-caisse.component.scss'],
})
export class AttributionCaisseComponent implements OnInit, OnDestroy {
    detailsDialog: boolean;
    caisseDialog: boolean;

    listdrp: Drp[];

    templistdrp: Drp[];

    listdrpfiltre: Drp[];
    drpchoisi: Drp;

    liststructure: Structure[];
    templiststructure: Structure[];
    liststructurefiltre: Structure[];
    structurechoisi: Structure;

    liststructannexe: any[];
    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    hasCaisse = false;

    product: Product;

    selectedProducts: Product[];

    // Structure

    attributionDialog: boolean;

    deleteStructureDialog: boolean = false;

    deleteStructuresDialog: boolean = false;

    typeCaisses: TypeCaisse[];

    typeCaisse: TypeCaisse;

    caisse: Caisse;

    caisses: Caisse[];

    tempcaisses: Caisse[];

    user: any;
    users: any[];

    selectedTypeCaisse: TypeCaisse[];

    listTypeCaisses: TypeCaisse[];
    listCaisse: Caisse[];

    listUser: any[];

    userSelected: any;

    historiqueCaisses: HistoriqueCaisse[];

    historiqueCaisse: HistoriqueCaisse;

    caisseListHistoriqueCaisse: HistoriqueCaisse[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    caisseSubject = new Subject<void>();

    selectedCaisse: Caisse;

    tempCaisses: Caisse[];

    selectedStructure;

    isLinear = false;

    @ViewChild('stepper') stepper: MatStepper;

    listRoles;

    utilisateur = JSON.parse(localStorage.getItem('user'));

    caissesAnnexes: Caisse[];
    listusersAnnexes = [];

    idstructureSelected;

    tempusers;

    bureauconnecte: any;
    usertemps;
    sub1: Subscription;
    sub2: Subscription;
    sub3: Subscription;

    isbureau = false;
    isDrp = false;
    subcaisse: Subscription;

    isSolo = false;
    structureSubject = new Subject<void>();
    userSubject = new Subject<void>();

    usersOb: Observable<any>;
    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private structureservice: StructureService,
        private typeStructureService: TypeStructureService,
        private drpservice: DrpService,
        private typecaisseservice: TypeCaisseService,
        private caisseservice: CaisseService,
        private userservice: UserService,
        private historiquecaisseservice: HistoriqueCaisseService,
        private keycloakservice: KeycloakService,
        private http: HttpClient,
        private userconnecte: UserconnecteService,
        private router: Router
    ) {}

    ngOnInit() {
        this.users = [];

        this.caisses = [];
        this.caissesAnnexes = [];

        this.liststructure = [];

        this.liststructannexe = [];

        //console.log(this.keycloakservice.getKeycloakInstance());

        this.listRoles =
            this.keycloakservice.getKeycloakInstance().realmAccess.roles;

        //console.log(this.listRoles);

       // console.log(this.keycloakservice.getKeycloakInstance().idToken);

        this.selectedStructure = [];
        this.productService
            .getProducts()
            .then((data) => (this.products = data));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];

        // NEW

        /*
this.caisseSubject.subscribe
(
  (data)=>
  {
      this.haveAllCaisse();
  }

)

 */

        this.haveAllCaisse();
        this.haveAllUser();
        this.haveAllTypeCaisse();

        this.haveAllDrp();
        this.haveAllStructure();
        this.sub3 = this.userservice.getAllUser().subscribe((data) => {
            this.users = data;
            this.users = this.users.filter(user=> user.dg_caisse == null)
            this.usertemps = this.users;
            //console.log(this.usersOb);

            //console.log(this.users);

            this.sub2 = this.http
                .get(environment.apiUrl + '/dg_Structure')
                .subscribe((data: any[]) => {
                    this.liststructure = data;
                    this.templiststructure = this.liststructure;
                    // console.log(this.liststructure);

                    ////////// INITIALISATION DES COMPOSANTS ///////////////

                    if (
                        this.listRoles.find(
                            (role) =>
                                role != 'ROLE_DRP' &&
                                role == 'ROLE_SUPERADMIN' &&
                                role != 'ROLE_RECEVEUR'
                        )
                    ) {
                        this.isbureau = false;
                        this.isDrp = false;

                        this.http
                            .get(environment.apiUrl + '/dg_Drp')
                            .subscribe((data: any[]) => {
                                this.listdrp = data;
                                console.log(this.listdrp);
                                this.listdrp = this.listdrp.filter(
                                    (drp) =>
                                        drp.libelle
                                            .toLowerCase()
                                            .includes('service') == false
                                );
                                this.templistdrp = this.listdrp;
                                console.log(this.listdrp);
                            });
                    }

                    if (
                        this.listRoles.find(
                            (role) =>
                                role == 'ROLE_DRP' && role != 'ROLE_SUPERADMIN'
                        )
                    ) {
                        /*

    this.userconnecte.getUser().then
    (
        (data)=>
        {
            this.utilisateur=data

        console.log(this.utilisateur)

        this.liststructure=this.liststructure.filter(structure=>structure.dg_drp.id==this.utilisateur.dg_structure.dg_drp.id)
        this.liststructure=this.liststructure.filter(structure=>structure.dg_typeStructure.id==1)
        this.templiststructure=this.liststructure

 //       this.users=this.users.filter(user=>user.dg_structure.dg_drp.id==1)

      //  this.caisses=this.caisses.filter(caisse=>caisse.dg_structure.dg_drp.id==1)
        console.log(this.liststructure)
     //   console.log(this.users)
        console.log(this.caisses)

        }
    )
    console.log("DRP")

    this.users=this.users.filter(user=>user.dg_structure.dg_drp.id==this.utilisateur.dg_structure.dg_drp.id)

 */

                        this.isDrp = true;

                        this.structureSubject.subscribe((data) => {
                            this.http
                                .get(
                                    environment.apiUrl +
                                        '/dg_Structure/drp/' +
                                        this.utilisateur.dg_structure.dg_drp.id
                                )
                                .subscribe((data: any[]) => {
                                    console.log('HERRREEUUDHDH');
                                    this.liststructure = data;
                                    console.log(this.liststructure);
                                    this.liststructure =
                                        this.liststructure.filter(
                                            (structure) =>
                                                structure.dg_typeStructure.libelle
                                                    .toLowerCase()
                                                    .includes('bureau') == true
                                        );
                                    this.templiststructure = this.liststructure;
                                });
                        });

                        this.structureSubject.next();
                    }

                    if (
                        this.listRoles.find(
                            (role) =>
                                role == 'ROLE_RECEVEUR' &&
                                role != 'ROLE_RESPONSABLE_ANNEXE' &&
                                role != 'ROLE_DRP' &&
                                role != 'ROLE_SUPERADMIN'
                        )
                    ) {
                        //    console.log("RECEVEURQNDJDJ")

                        /* this.userconnecte.getUser().then
    (
        (data)=>
        {
            */

                        /*

            this.utilisateur=JSON.parse(localStorage.getItem("user"))

        console.log(this.utilisateur)

       // this.liststructure=this.liststructure.filter(structure=>structure.id==this.utilisateur.dg_structure.id || structure.dg_structureAnnexe.bureau.id==structure.id)

        this.templiststructure=this.liststructure

 //       this.users=this.users.filter(user=>user.dg_structure.dg_drp.id==1)

      //  this.caisses=this.caisses.filter(caisse=>caisse.dg_structure.dg_drp.id==1)
        console.log(this.liststructure)
     //   console.log(this.users)
        console.log(this.caisses)

            let structure= this.liststructure.find(structure=> structure.id==this.utilisateur.dg_structure.id)

            console.log(structure)
            if(structure.dg_structureBureau.length==0 )
            {
                this.caisses=this.caisses.filter(caisse=>caisse.dg_structure.id==this.utilisateur.dg_structure.id)
            }
            else
            {
                let caissesstrutannexes=[]


                let usersAnnexes=[]


                console.log(this.users)
                this.users=this.users.filter(user=>user.dg_structure.id==this.utilisateur.dg_structure.id)

                for(let caisse of this.caisses)
                {
                    if(caisse.dg_structure.id == this.utilisateur.dg_structure.id)
                    {
                        caissesstrutannexes.push(caisse)
                    }
                }

                if(structure.dg_structureBureau.length>0)
                {



                for(let caisse of this.caisses)
                {
                    for(let structureAnnexe of structure.dg_structureBureau)
                    {
                                console.log(structureAnnexe)
                        if(structureAnnexe.annexe.id==caisse.dg_structure.id)
                        {
                            if(caisse.dg_typeCaisse.id==5)
                            {
                            this.listusersAnnexes.push(this.users.filter(user=>user.dg_structure.id==structureAnnexe.annexe.id))
                          //  caissesstrutannexes.push(caisse)

                            this.caissesAnnexes.push(caisse)
                            }
                        }


                    }
                }
            }

                this.caisses=caissesstrutannexes

                this.caisses=this.caisses.filter(caisse=>caisse.dg_typeCaisse.id!=1)


                console.log(this.caisses)
                console.log(this.caissesAnnexes)

                this.tempusers=this.users
            }



            //this.users=this.users.filter(user=>user.dg_structure.id==this.structurechoisi.id)


/*

        }
        )
        */

                        console.log(this.utilisateur.dg_structure.id);

                        this.selectedStructure = this.utilisateur.dg_structure;

                        this.isbureau = true;
                        this.caisseSubject.subscribe(() => {
                            this.http
                                .get(
                                    environment.apiUrl +
                                        '/dg_Caisse/structure/' +
                                        this.utilisateur.dg_structure.id
                                )
                                .subscribe((data: any[]) => {
                                    console.log('hah');
                                    this.caisses = data;
                                    console.log(this.caisses);

                                    this.caisseSubject.subscribe((data) => {
                                        this.caisses = this.caisses.filter(
                                            (caisse) =>
                                                caisse.dg_typeCaisse.libelle
                                                    .toLowerCase()
                                                    .includes('receveur') !=
                                                true
                                        );
                                    });

                                    this.caisses = this.caisses.filter(
                                        (caisse) =>
                                            caisse.dg_typeCaisse.libelle
                                                .toLowerCase()
                                                .includes('receveur') != true
                                    );

                                    this.http
                                        .get(
                                            environment.apiUrl +
                                                '/dg_User/structure/' +
                                                this.utilisateur.dg_structure.id
                                        )
                                        .subscribe((data: any[]) => {
                                            this.users = data;

                                            this.users = this.users.filter(
                                                (user) => user.dg_caisse == null
                                            );
                                            this.tempusers = this.users;
                                            console.log(this.users);
                                        });

                                    this.http
                                        .get(
                                            environment.apiUrl +
                                                '/dg_Structure/' +
                                                this.utilisateur.dg_structure.id
                                        )
                                        .subscribe((data: any[]) => {
                                            this.bureauconnecte = data;

                                            if (
                                                this.bureauconnecte
                                                    .dg_structureBureau
                                                    .length != 0
                                            ) {
                                                this.liststructannexe =
                                                    this.bureauconnecte.dg_structureBureau;
                                            }

                                            console.log(this.liststructannexe);
                                        });
                                });
                        });

                        this.caisseSubject.next();
                    }

                    if (
                        this.listRoles.find(
                            (role) =>
                                role == 'ROLE_GRANDECAISSE' &&
                                role != 'ROLE_RECEVEUR' &&
                                role != 'ROLE_RESPONSABLE_ANNEXE' &&
                                role != 'ROLE_DRP' &&
                                role != 'ROLE_SUPERADMIN'
                        )
                    ) {
                        alert('hhhHDh');

                        console.log(this.utilisateur.dg_structure.id);

                        this.selectedStructure = this.utilisateur.dg_structure;

                        this.isbureau = true;


                        this.isSolo == true;
                        this.caisseSubject.subscribe(() => {
                            this.http
                                .get(
                                    environment.apiUrl +
                                        '/dg_Caisse/structure/' +
                                        this.utilisateur.dg_structure.id
                                )
                                .subscribe((data: any[]) => {
                                    console.log('hah');
                                    this.caisses = data;
                                    console.log(this.caisses);

                                    this.caisseSubject.subscribe((data) => {
                                        this.caisses = this.caisses.filter(
                                            (caisse) =>
                                                caisse.dg_typeCaisse.libelle
                                                    .toLowerCase()
                                                    .includes('receveur') !=
                                                    true &&
                                                caisse.dg_typeCaisse.libelle
                                                    .toLowerCase()
                                                    .includes('grande') != true
                                        );
                                    });

                                    this.caisses = this.caisses.filter(
                                        (caisse) =>
                                            caisse.dg_typeCaisse.libelle
                                                .toLowerCase()
                                                .includes('receveur') != true &&
                                            caisse.dg_typeCaisse.libelle
                                                .toLowerCase()
                                                .includes('grande') != true
                                    );

                                    this.http
                                        .get(
                                            environment.apiUrl +
                                                '/dg_User/structure/' +
                                                this.utilisateur.dg_structure.id
                                        )
                                        .subscribe((data: any[]) => {
                                            this.users = data;

                                            this.users = this.users.filter(
                                                (user) => user.dg_caisse == null
                                            );
                                            this.tempusers = this.users;
                                            console.log(this.users);
                                        });
                                });
                        });

                        this.caisseSubject.next();
                    }

                    if (
                        this.listRoles.find(
                            (role) =>
                                role == 'ROLE_RESPONSABLE_ANNEXE' &&
                                role != 'ROLE_GRANDECAISSE' &&
                                role != 'ROLE_RECEVEUR' &&
                                role != 'ROLE_DRP' &&
                                role != 'ROLE_SUPERADMIN'
                        )
                    ) {
                        console.log(this.utilisateur.dg_structure.id);

                        this.selectedStructure = this.utilisateur.dg_structure;

                        this.isbureau = true;

                        this.isSolo == true;
                        this.caisseSubject.subscribe(() => {
                            this.http
                                .get(
                                    environment.apiUrl +
                                        '/dg_Caisse/structure/' +
                                        this.utilisateur.dg_structure.id
                                )
                                .subscribe((data: any[]) => {
                                    console.log('hah');
                                    this.caisses = data;
                                    console.log(this.caisses);

                                    this.caisseSubject.subscribe((data) => {
                                        this.caisses = this.caisses.filter(
                                            (caisse) =>
                                                caisse.dg_typeCaisse.libelle
                                                    .toLowerCase()
                                                    .includes('annexe') != true
                                        );
                                    });

                                    this.caisses = this.caisses.filter(
                                        (caisse) =>
                                            caisse.dg_typeCaisse.libelle
                                                .toLowerCase()
                                                .includes('annexe') != true
                                    );

                                    this.http
                                        .get(
                                            environment.apiUrl +
                                                '/dg_User/structure/' +
                                                this.utilisateur.dg_structure.id
                                        )
                                        .subscribe((data: any[]) => {
                                            this.users = data;

                                            this.users = this.users.filter(
                                                (user) => user.dg_caisse == null
                                            );
                                            this.tempusers = this.users;
                                            console.log(this.users);
                                        });
                                });
                        });

                        this.caisseSubject.next();
                    }
                });
        });
    }

    filterDrp(event) {
        const filtered: Drp[] = [];
        const query = event.query;
        for (let i = 0; i < this.listdrp.length; i++) {
            const drp = this.listdrp[i];
            if (drp.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(drp);
            }
        }

        this.listdrpfiltre = filtered;
    }

    filterStructure(event) {
        const filtered: Structure[] = [];
        const query = event.query;

        this.liststructure = this.liststructure.filter(struct=>struct.dg_typeStructure?.libelle.toLowerCase().includes('bureau') == true
        );
        for (let i = 0; i < this.liststructure.length; i++) {
            const struc = this.liststructure[i];
            if (struc.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(struc);
            }
        }

        this.liststructurefiltre = filtered;
        console.log( this.liststructurefiltre )
    }

    goCaissesAnnexes(struct) {
        sessionStorage.setItem('annexe', JSON.stringify(struct));

        this.router.navigate(['/caisse/attributionCaisseAnnexe']);
    }

    haveAllCaisse() {
        this.sub1 = this.caisseservice
            .getAllCaisse()
            .subscribe((data: Caisse[]) => {
                this.caisses = data;
                console.log(this.caisses);
                this.tempCaisses = data;
            });
    }

    haveAllTypeCaisse() {
        this.typecaisseservice.getAllTypeCaisse().subscribe((data: Drp[]) => {
            this.listTypeCaisses = data;

            console.log('here it go');
            console.log(this.listTypeCaisses);
        });
    }

    haveAllUser() {
        this.sub3 = this.userservice.getAllUser().subscribe((data) => {
            this.users = data;
            this.users = this.users.filter((user) => user.dg_caisse == null);

            console.log(this.users);
        });
    }

    haveAllDrp() {
        this.http.get(environment.apiUrl + '/dg_Drp').subscribe({
            next: (data: Drp[]) => {
                this.listdrp = data;
                console.log(this.listdrp);

                this.listdrp = this.listdrp.filter(
                    (drp) =>
                        drp.libelle.toLowerCase().includes('service') == false
                );
                this.templistdrp = this.listdrp;
                console.log(this.listdrp);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Service Unavailable',
                    detail: 'Error ' + err.status + ' : ' + err.message,
                });
            },
        });
    }

    haveAllStructure() {
        this.sub2 = this.http
            .get(environment.apiUrl + '/dg_Structure')
            .subscribe((data: any[]) => {
                this.liststructure = data;
                this.templiststructure = this.liststructure;
                console.log(this.templiststructure);
            });
    }

    choixDrp() {
        this.structurechoisi = null;
        console.log(this.drpchoisi);

        console.log(this.liststructure);

        this.http
            .get(environment.apiUrl + '/dg_Structure')
            .subscribe((data: any[]) => {
                this.liststructure = this.liststructure.filter(
                    (structure) => structure.dg_drp.id == this.drpchoisi.id
                );
                //this.liststructure=this.liststructure.filter(structure=>structure.dg_typeStructure.id<=2)
            });

        console.log(this.liststructure);

        /*
      this.http.get(environment.apiUrl+'/dg_Structure/drp/'+this.drpchoisi.id).subscribe
      (
          (data:any[])=>
          {

              this.liststructure=data
              console.log(this.liststructure)
              //this.liststructure=this.liststructure.filter(structure=>structure.dg_typeStructure.id<=2)
              console.log(this.liststructure)
          }
      )

 */
        console.log(this.stepper);

        this.stepper.selected.completed = true;

        this.stepper.next();
    }

    choixStructure() {
        console.log(this.users);

        console.log(this.structurechoisi);

        // this.caisses =this.caisses.filter(caisse=>caisse.dg_structure.id==this.structurechoisi.id)

        if (
            this.listRoles.find(
                (role) => role == 'ROLE_DRP' && role != 'ROLE_SUPERADMIN'
            )
        ) {
            this.caisseSubject.subscribe((data) => {
                this.http
                    .get(
                        environment.apiUrl +
                            '/dg_User/structure/' +
                            this.structurechoisi.id
                    )
                    .subscribe((data: any[]) => {
                        this.users = data;
                        console.log(this.users);

                        this.users = this.users.filter(
                            (user) =>
                                user.roles.find(
                                    (role) => role.authority == 'ROLE_RECEVEUR'
                                ) != undefined
                        );
                        this.tempusers = this.users;

                        console.log(this.users);

                        this.http
                            .get(
                                environment.apiUrl +
                                    '/dg_Caisse/structure/' +
                                    this.structurechoisi.id
                            )
                            .subscribe((data: any[]) => {
                                this.caisses = data;
                                this.caisses = this.caisses.filter(
                                    (caisse) =>
                                        caisse.dg_structure.id ==
                                        this.structurechoisi.id
                                );
                                this.caisses = this.caisses.filter(
                                    (caisse) =>
                                        caisse.dg_typeCaisse.libelle
                                            .toLowerCase()
                                            .includes('receveur') == true
                                );
                            });
                    });
            });

            this.caisseSubject.next();
        }

        if (
            this.listRoles.find(
                (role) =>
                    role != 'ROLE_DRP' &&
                    role == 'ROLE_SUPERADMIN' &&
                    role != 'ROLE_RECEVEUR' &&
                    role != 'ROLE_RESPONSABLE_ANNEXE'
            )
        ) {
            this.http
                .get(
                    environment.apiUrl +
                        '/dg_Structure/' +
                        this.structurechoisi.id
                )
                .subscribe((data: any[]) => {
                    this.bureauconnecte = data;

                    if (this.bureauconnecte.dg_structureBureau.length != 0) {
                        this.liststructannexe =
                            this.bureauconnecte.dg_structureBureau;
                    }

                    console.log(this.liststructannexe);
                });

            this.caisseSubject.subscribe((data) => {
                this.http
                    .get(
                        environment.apiUrl +
                            '/dg_Caisse/structure/' +
                            this.structurechoisi.id
                    )
                    .subscribe((data: any[]) => {
                        this.caisses = data;

                        this.http
                            .get(
                                environment.apiUrl +
                                    '/dg_User/structure/' +
                                    this.structurechoisi.id
                            )
                            .subscribe((data: any[]) => {
                                this.users = data;
                                this.tempusers = this.users;
                            });
                    });
            });

            this.caisseSubject.next();
        }

        this.stepper.selected.completed = true;

        /*

        if (this.listRoles.find(role=>role=="ROLE_DRP" && role!="ROLE_SUPERADMIN") )
        {

            console.log(this.users)
            this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_RECEVEUR')!=undefined)


            this.tempusers=this.users

        }

         */

        this.stepper.next();
    }

    resetStepper() {
        this.liststructure = this.templiststructure;
        this.listdrp = this.templistdrp;
        this.caisses = this.tempCaisses;

        this.users = this.usertemps;
       
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

    showAnnexes(structure) {
        this.selectedStructure = structure.dg_structureAnnexe;
    }

    filterUser(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            user.libelle = user.nom + ' ' + user.prenom;

            if (user.libelle.toLowerCase().indexOf(query) == 0) {
                filtered.push(user);
            }
        }

        this.listUser = filtered;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editCaisse(caisse) {
        // OLD       this.product = {...product};

        console.log(this.users);
        this.userSelected = {};

        this.caisseDialog = true;
        this.caisse = { ...caisse };
        console.log(this.caisse);

        console.log(this.caisses);
        console.log(this.liststructure);

        this.idstructureSelected = this.caisse.dg_structure.id;

        this.userSubject.subscribe(() => {
            this.http
                .get(
                    environment.apiUrl +
                        '/dg_User/structure/' +
                        this.idstructureSelected
                )
                .subscribe((data: any[]) => {
                    this.users = data;
                    this.users = this.users.filter(
                        (user) => user.dg_caisse == null
                    );

                    console.log(this.users);

                    this.tempusers = this.users;

                    /*
                      if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("receveur")== true)
                      {
                          this.users=this.users.filter(user=>user.fonction.libelle.toLowerCase().includes("receveur")==true)
                      }

                      if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("annexe")== true)
                      {
                          this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_RESPONSABLE_ANNEXE')!=undefined)
                      }
                      if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("arriere")== true)
                      {
                          this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_ARRIERE')!=undefined)
                      }

                      if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("grande")== true)
                      {
                          this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_GRANDECAISSE')!=undefined)
                      }
                      if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("guichet")== true)
                      {
                          this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_GUICHET')!=undefined)
                      }
                      */

                    if (
                        this.caisse.dg_typeCaisse.libelle
                            .toLowerCase()
                            .includes('receveur') == true
                    ) {
                        this.users = this.users.filter(
                            (user) =>
                                user.dg_fonction.libelle
                                    .toLowerCase()
                                    .includes('receveur') == true
                        );
                    }

                    if (
                        this.caisse.dg_typeCaisse.libelle
                            .toLowerCase()
                            .includes('annexe') == true
                    ) {
                        this.users = this.users.filter(
                            (user) =>
                                user.dg_fonction.libelle
                                    .toLowerCase()
                                    .includes('annexe') == true
                        );
                    }
                    if (
                        this.caisse.dg_typeCaisse.libelle
                            .toLowerCase()
                            .includes('arriere') == true
                    ) {
                        this.users = this.users.filter(
                            (user) =>
                                user.dg_fonction.libelle
                                    .toLowerCase()
                                    .includes('arriere') == true
                        );
                    }

                    if (
                        this.caisse.dg_typeCaisse.libelle
                            .toLowerCase()
                            .includes('grand') == true
                    ) {
                        this.users = this.users.filter(
                            (user) =>
                                user.dg_fonction.libelle
                                    .toLowerCase()
                                    .includes('grand') == true
                        );
                    }
                    if (
                        this.caisse.dg_typeCaisse.libelle
                            .toLowerCase()
                            .includes('guichet') == true
                    ) {
                        this.users = this.users.filter(
                            (user) =>
                                user.dg_fonction.libelle
                                    .toLowerCase()
                                    .includes('guichet') == true
                        );

                        console.log(this.users);
                        console.log('fii');
                    }

                    if (this.users.length == 0) {
                        this.messageService.add({
                            key: 'ab',
                            severity: 'warn',
                            summary:
                                'Pas d utilisateur disponibles pour cette caisse',
                            life: 3000,
                        });
                    }
                });
        });

        this.userSubject.next();

        //console.log(this.users)
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(
            (val) => !this.selectedProducts.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedProducts = null;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(
            (val) => val.id !== this.product.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
        this.product = {};
    }

    hideDialog() {
        this.caisseDialog = false;
        this.submitted = false;
    }

    details(caisse) {
        this.caisse = { ...caisse };

        this.hasCaisse = false;

        if (this.caisse.dg_user != null || this.caisse.dg_user != undefined) {
            this.hasCaisse = true;
        }

        console.log(caisse);
        this.detailsDialog = true;

        this.historiquecaisseservice
            .getAllHistoriqueCaisseByid(caisse)
            .subscribe((data: any) => {
                this.caisseListHistoriqueCaisse = data;
                console.log(this.caisseListHistoriqueCaisse);
            });
    }

    cloturerNow(caisse) {
        this.confirmationService.confirm({
            message: 'Voulez vous Cloturer cette caisse?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.historiquecaisseservice
                    .getAllHistoriqueCaisseByid(caisse)
                    .subscribe((data: any) => {
                        this.caisseListHistoriqueCaisse = data;
                        console.log(this.caisseListHistoriqueCaisse);

                        let lastHistoCaisse =
                            this.caisseListHistoriqueCaisse[
                                this.caisseListHistoriqueCaisse.length - 1
                            ];

                        for (let histo of this.caisseListHistoriqueCaisse) {
                            console.log(histo);

                            if (lastHistoCaisse.id <= histo.id) {
                                lastHistoCaisse = histo;
                            }
                        }

                        this.caisseservice
                            .cloturerCaisse(lastHistoCaisse)
                            .subscribe({
                                next: (data) => {
                                    console.log(data);

                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Successful',
                                        detail: 'Caisse Cloturé',
                                        life: 3000,
                                    });

                                    this.caisseSubject.next();
                                },
                                error: (err) => {
                                    console.log(err);

                                    this.messageService.add({
                                        severity: 'error',
                                        summary: 'Error',
                                        detail: 'Erreur de cloture',
                                        life: 3000,
                                    });
                                },
                            });
                    });
            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Rejeté',
                            detail: 'Requete rejeté',
                        });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Annulé',
                            detail: 'Requete annulé',
                        });
                        break;
                }
            },
        });
    }

    cloturerCaisse() {
        /* OLD ONE
    this.historiqueCaisse = {}
    this.historiqueCaisse.dg_user=this.caisse.dg_user
    this.historiqueCaisse.dg_caisse=this.caisse
    this.historiqueCaisse.datecloture= new Date();

    this.caisse.dg_user=null
    console.log(this.caisse)






    this.caisseservice.putCaisse(this.caisse).subscribe
    (
        (data1)=>
        {
            console.log(data1)

            this.historiquecaisseservice.saveHistoriqueCaisse(this.historiqueCaisse).subscribe
            (
                (data2)=>
                {
                    console.log(data2)

                    this.caisseSubject.next()
                }
            )
        }
    )

    */

        let lastHistoCaisse =
            this.caisseListHistoriqueCaisse[
                this.caisseListHistoriqueCaisse.length - 1
            ];

        for (let histo of this.caisseListHistoriqueCaisse) {
            console.log(histo);

            if (lastHistoCaisse.id <= histo.id) {
                lastHistoCaisse = histo;
            }
        }

        this.caisseservice.cloturerCaisse(lastHistoCaisse).subscribe({
            next: (data) => {
                console.log(data);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Caisse Cloturé',
                    life: 3000,
                });

                this.caisseSubject.next();
            },
            error: (err) => {
                console.log(err);

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur de cloture',
                    life: 3000,
                });
            },
        });

        this.detailsDialog = false;
    }

    saveCaisse() {
        this.submitted = true;
        /* OLD
     delete this.caisse.dg_user.libelle

        console.log(this.caisse)

        this.historiqueCaisse = {}

    this.historiqueCaisse.dg_user=this.caisse.dg_user
    this.historiqueCaisse.dg_caisse=this.caisse




     this.caisseservice.putCaisse(this.caisse).subscribe
     (
         (data1)=>
         {

             console.log(data1)

            this.historiquecaisseservice.saveHistoriqueCaisse(this.historiqueCaisse).subscribe
            (
                (data2)=>
                {
                    console.log(data2)
                }
            )

             this.caisseSubject.next();
         }
     )


*/

        this.caisseservice
            .affecterCaisse(this.caisse, this.userSelected)
            .subscribe(
                (data1) => {
                    console.log(data1);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Caisse Affecté',
                        life: 3000,
                    });

                    this.caisseSubject.next();
                },
                (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: "Erreur d'affectation",
                        life: 3000,
                    });
                }
            );

        console.log(this.caisse);

        this.caisseDialog = false;

        /* OLD

      if (this.product.name.trim()) {
          if (this.product.id) {
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          } else {
              this.product.id = this.createId();
              this.product.code = this.createId();
              this.product.image = 'product-placeholder.svg';
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.products.push(this.product);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
      */
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    ngOnDestroy() {}
}
