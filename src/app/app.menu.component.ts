import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none" style="color:black;">

                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">


                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i"  role="none" >

                    <span *ngIf="item.items.roles==false"> {{item.items.label}}  </span>
                        </li>
                    </ul>
                </li>
                <!--
                <a href="https://www.primefaces.org/primeblocks-ng/#/">
                    <img src="assets/layout/images/{{appMain.config.dark ? 'banner-primeblocks-dark' : 'banner-primeblocks'}}.png" alt="Prime Blocks" class="w-full mt-3"/>
                </a>
-->
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {
    listRoles

    model: any[];

    constructor(public appMain: AppMainComponent, private keycloak: KeycloakService) { }

    ngOnInit() {
        this.model = [
/*            {
                label: 'Home',
                rootroles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_GUICHET','ROLE_RECEVEUR','ROLE_RESPONSABLE_ANNEXE','ROLE_DRP', 'ROLE_DER', 'ROLE_GRANDECAISSE']),
                items:[
                    {label: 'Tableau de Bord',icon: 'pi pi-fw pi-home', routerLink: ['/'], roles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_GUICHET','ROLE_RECEVEUR','ROLE_RESPONSABLE_ANNEXE','ROLE_DRP', 'ROLE_DCP'])}
                ]
            },
            */

            {
                label: 'Gestion Organisation',
                rootroles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_DER']),
                items:
                [
                    {label: 'Drp', icon: 'pi pi-fw pi-id-card', routerLink: ['/organisations/drp'], roles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_DER'])},
                    {label: 'Toutes les Structures', icon: 'pi pi-fw pi-check-square', routerLink: ['/organisations/structures'], roles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_DER'])},
                  //  {label: 'Structures Annexes', icon: 'pi pi-fw pi-bookmark', routerLink: ['/organisations/annexes'], roles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_DER'])},
           //         {label: 'Centres', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/organisations/centres']},
                //    {label: 'Directions', icon: 'pi pi-fw pi-mobile', routerLink: ['/organisations/directions'], class: 'rotated-icon'},
                    {label: 'Bureaux de Poste', icon: 'pi pi-fw pi-hashtag', routerLink: ['/organisations/bureaux'], roles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_DER'   ])},


                ]
            },
            {
                label: 'Gestion Caisse',
                rootroles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_DRP', 'ROLE_RECEVEUR', 'ROLE_RESPONSABLE_ANNEXE', 'ROLE_GRANDECAISSE']),
                items:[
                    {label: 'Attribution Caisse',icon: 'pi pi-fw pi-home', routerLink: ['/caisse/attributionCaisse'], roles: this.findRole(['ROLE_SUPERADMIN','ROLE_RECEVEUR','ROLE_RESPONSABLE_ANNEXE','ROLE_GRANDECAISSE', 'ROLE_DRP'])},
                    {label: 'Ajout Caisses',icon: 'pi pi-fw pi-dollar', routerLink: ['/caisse/caisses'], roles:this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_DRP'])},
                    {label: 'Liste Caisses',icon: 'pi pi-fw pi-dollar', routerLink: ['/caisse/caisses'], roles:this.findRole([ 'ROLE_DRP','ROLE_RESPONSABLE_ANNEXE','ROLE_RECEVEUR'])}
                ]
            },

            {

                label: 'Gestion Utilisateur',
                rootroles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN','ROLE_RECEVEUR','ROLE_RESPONSABLE_ANNEXE','ROLE_DRP', 'ROLE_DER', 'ROLE_RESPONSABLE_ANNEXE']),

                items:[

                    {label: 'Historique Utilisateurs',icon: 'pi pi-fw pi-users', routerLink: ['/utilisateurs/histoUtilisateurs'],id:8,roles:this.findRole(['ROLE_SUPERADMIN','ROLE_DER'])},
                    {label: 'Attribution Role(s)',icon: 'pi pi-fw pi-user-plus', routerLink: ['/utilisateurs/attributionroles'],id:6, roles:this.findRole(['ROLE_SUPERADMIN','ROLE_DRP','ROLE_DER'])},
                    {label: 'Agents DRP', icon: 'pi pi-fw pi-id-card', routerLink: ['/Users_drp'], roles:this.findRole([ 'ROLE_DER']) },
                        {label: 'Agents Bureaux', icon: 'pi pi-fw pi-id-card', routerLink: ['/Users_bureaux'],roles:this.findRole([ 'ROLE_DRP'])},
                        {label: 'Agents DRP', icon: 'pi pi-fw pi-id-card', routerLink: ['/Users_bureau'], roles: false},
                        {label: 'Agents Bureau  ', icon: 'pi pi-fw pi-id-card', routerLink: ['/Users_annexe'], roles:this.findRole([ 'ROLE_RECEVEUR','ROLE_GRANDECAISSE','ROLE_RESPONSABLE_ANNEXE'])},
                        {label: 'Agents DRP', icon: 'pi pi-fw pi-id-card', routerLink: ['/StructuresUsers'],roles:this.findRole([ 'ROLE_SUPERADMIN'])},
                        {label: 'Agents des bureaux', icon: 'pi pi-fw pi-id-card', routerLink: ['/OtherUsers'],roles:this.findRole([ 'ROLE_DER'])},
                        {label: 'Agents de ma DRP', icon: 'pi pi-fw pi-id-card', routerLink: ['/Usersdrp'],roles:this.findRole([ 'ROLE_DRP'])},

                ]

            },
            
            {
                label: 'Gestion Produits et Processus',
                rootroles: this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_DRP', 'ROLE_RECEVEUR', 'ROLE_RESPONSABLE_ANNEXE', 'ROLE_GRANDECAISSE']),
                items:[
                    {label: 'Produits',icon: 'pi pi-fw pi-home', routerLink: ['/gestionproduits'], roles: this.findRole(['ROLE_SUPERADMIN','ROLE_RECEVEUR','ROLE_RESPONSABLE_ANNEXE','ROLE_GRANDECAISSE', 'ROLE_DRP'])},
                    {label: 'Processus',icon: 'pi pi-fw pi-dollar', routerLink: ['/gestionprocessus'], roles:this.findRole(['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_DRP'])},
                   
                ]
            },
            /*,
            {
                label: 'UI Components',
                rootroles: true,

                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'], roles:true },
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'], roles:true },
                    {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'], roles:true },
                    {label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'], roles:true },
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon', roles:true },
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'], roles:true },
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'], roles:true },
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'], roles:true },
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'], roles:true },
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'], roles:true },
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'], roles:true },
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true, roles:true },
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'], roles:true },
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'], roles:true },
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'], roles:true },
                    {label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'], roles:true }
                ]
            },
            {
                label:'Prime Blocks',
                rootroles: true,

                items:[
                    {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW', roles:true },
                    {label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank', roles:true },
                ]
            },
            {label:'Utilities',
            rootroles: true,

                items:[
                    {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/icons'], roles:true },
                    {label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank', roles:true },
                ]
            },
            {
                label: 'Pages',
                rootroles: true,

                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-user-edit', routerLink: ['/pages/crud'], roles:true },
                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'], roles:true },
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', routerLink: ['pages/landing'], roles:true },
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login'], roles:true },
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error'], roles:true },
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound'], roles:true },
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access'], roles:true },
                    {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['/pages/empty'], roles:true }
                ]
            },
            {
                label: 'Hierarchy',
                rootroles: true,

                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark', roles:true ,
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark', roles:true ,
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark', roles:true },
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark', roles:true },
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark', roles:true },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark', roles:true ,
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark', roles:true }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark', roles:true ,
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark', roles:true ,
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark', roles:true },
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark', roles:true },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark', roles:true ,
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark', roles:true },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label:'Get Started',
                rootroles: true,

                items:[
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation'], roles:true
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank', roles:true
                    }
                ]
            }
            */

        ];


        this.model=this.model.filter(x=>x.rootroles==true)

        for(let root of this.model)
        {

            root.items=root.items.filter(x=>x.roles==true)


        }

        console.log(this.model)



    }


    findRole(rolearray: Array<String>)
{

  this.listRoles=this.keycloak.getKeycloakInstance().realmAccess.roles
//  console.log(this.listRoles)
  let menut= false
  const length=rolearray.length-1

  console.log(length)

        console.log(typeof this.listRoles)

  if (typeof this.listRoles==="object")
{
let taille= this.listRoles.length - 1
for(let i=0; i<=length; i++)
 {
   for (let j=0; j<=taille; j++)
   {
//if(testlist.find(role=>role===rolearray[i])!=undefined){
  if(this.listRoles[j]===rolearray[i]){
  menut=true
}

 }
   }
}
else if(typeof this.listRoles!="object")
{
  for(let i=0; i<=length; i++)
 {
  if(this.listRoles===rolearray[i]){
    menut=true
  }
 }
}
return menut

}

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
