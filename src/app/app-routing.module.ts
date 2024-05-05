import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { DrpComponent } from './components/gestion organisation/drp/drp.component';
import { StructuresComponent } from './components/gestion organisation/structures/structures.component';
import { AnnexesComponent } from './components/gestion organisation/annexes/annexes.component';
import { CentresComponent } from './components/gestion organisation/centres/centres.component';
import { DirectionsComponent } from './components/gestion organisation/directions/directions.component';
import { BureauComponent } from './components/gestion organisation/bureau/bureau.component';
import { AttributionCaisseComponent } from './components/gestion caisse/attribution-caisse/attribution-caisse.component';
import { AffecterAnnexeComponent } from './components/gestion organisation/affecterAnnexe/affecterAnnexe.component';
import { CaissesComponent } from './components/gestion caisse/caisses/caisses.component';
import { UsersComponent } from './components/gestion utilisateur/attributionRole/users.component';
import { UtilisateursComponent } from './components/gestion utilisateur/utilisateurs/utilisateurs.component';
import { AuthGuard } from './service/auth.guard';
import { HistoriqueUserComponent } from './components/gestion utilisateur/historique-user/historique-user.component';
import { UtilisateursStructureComponent } from './components/gestion utilisateur/utilisateurs-structure/utilisateurs-structure.component';
import {
    AttributionCaisseannexeComponent
} from "./components/gestion caisse/attribution-caisseannexe/attribution-caisseannexe.component";
import { AgentAnnexeComponent } from './components/gestion utilisateur/Users/agent-annexe/agent-annexe.component';
import { AgentReceveurComponent } from './components/gestion utilisateur/Users/agent-receveur/agent-receveur.component';
import { AgentsadrpComponent } from './components/gestion utilisateur/Users/agentsadrp/agentsadrp.component';
import { ProduitsComponent } from './components/gestion produitsServices/produits/produits.component';
import { ServicesComponent } from './components/gestion produitsServices/services/services.component';
import { ProcessusComponent } from './components/gestion produitsServices/processus/processus.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {

                path: '', component: AppMainComponent,
                canActivate:[AuthGuard],

                children: [
                    {path: '', component: DashboardComponent,
                },

                    {path: 'uikit/formlayout', component: FormLayoutComponent},
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/button', component: ButtonComponent},
                    {path: 'uikit/table', component: TableComponent},
                    {path: 'uikit/list', component: ListComponent},
                    {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path: 'uikit/media', component: MediaComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/crud', component: CrudComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent},


                                    // Routing



                    {path: 'organisations/drp', component: DrpComponent},
                    {path: 'organisations/structures', component: StructuresComponent},
                    {path: 'organisations/annexes', component: AnnexesComponent},
                    {path: 'organisations/bureaux/affecterAnnexe', component: AffecterAnnexeComponent},
                    {path: 'organisations/centres', component: CentresComponent},
                    {path: 'organisations/directions', component: DirectionsComponent},
                    {path: 'organisations/bureaux', component: BureauComponent},

                    {path: 'caisse/attributionCaisse', component: AttributionCaisseComponent, canActivate:[AuthGuard],data: {roles: ['ROLE_SUPERADMIN','ROLE_RECEVEUR','ROLE_RESPONSABLE_ANNEXE','ROLE_DRP','ROLE_GRANDECAISSE']}},
                    {path: 'caisse/caisses', component: CaissesComponent},

                    {path: 'caisse/attributionCaisseAnnexe', component: AttributionCaisseannexeComponent},
                                
                    {path: 'gestionproduits', component: ProduitsComponent},
                    {path: 'gestionservices', component: ServicesComponent},
                    {path: 'gestionprocessus', component: ProcessusComponent},
                 

                    {path: 'utilisateurs/utilisateurs', component: UtilisateursComponent},
                    {path: 'utilisateurs/histoUtilisateurs', component: HistoriqueUserComponent},
                    {path: 'utilisateurs/utilisateurs-structure', component: UtilisateursStructureComponent},
                    {path: 'utilisateurs/attributionroles', loadChildren: () => import('./components/gestion utilisateur/attributionRole/roles.module').then(t => t.rolesModule)},
                    {path: 'StructuresUsers', loadChildren: () => import('./components/gestion utilisateur/structure-users/roles.module2').then(t => t.rolesModule2)},
                    {path: 'OtherUsers', loadChildren: () => import('./components/gestion utilisateur/otheruser/roles.module3').then(t => t.rolesModule3)},
                    {path: 'Users_drp', loadChildren: () => import('./components/gestion utilisateur/Users/agent-der/rolesModule4').then(t => t.rolesModule4)},
                    {path: 'Users_bureaux', loadChildren: () => import('./components/gestion utilisateur/Users/agent-drp/roles.module5').then(t => t.rolesModule5)},
                    {path: 'Users_bureau', component: AgentReceveurComponent},
                    {path: 'Users_annexe', component: AgentAnnexeComponent},
                    {path: 'Usersdrp', component: AgentsadrpComponent},



                ],
            },
            {path:'pages/landing', component: LandingComponent},
            {path:'pages/login', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},




        ],



        {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
