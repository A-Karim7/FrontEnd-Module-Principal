import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { BlockViewer } from './components/blockviewer/blockviewer.component';

import { AppCodeModule } from './components/app-code/app.code.component';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MenusComponent } from './components/menus/menus.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { CrudComponent } from './components/crud/crud.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { PaymentComponent} from './components/menus/payment.component';
import { ConfirmationComponent } from './components/menus/confirmation.component';
import { PersonalComponent } from './components/menus/personal.component';
import { SeatComponent } from './components/menus/seat.component';
import { LandingComponent } from './components/landing/landing.component';

import { CountryService } from './service/countryservice';
import { CustomerService } from './service/customerservice';
import { EventService } from './service/eventservice';
import { IconService } from './service/iconservice';
import { NodeService } from './service/nodeservice';
import { PhotoService } from './service/photoservice';
import { ProductService } from './service/productservice';
import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { DrpComponent } from './components/gestion organisation/drp/drp.component';
import { StructuresComponent } from './components/gestion organisation/structures/structures.component';
import { AnnexesComponent } from './components/gestion organisation/annexes/annexes.component';
import { CentresComponent } from './components/gestion organisation/centres/centres.component';
import { BureauComponent } from './components/gestion organisation/bureau/bureau.component';
import { DirectionsComponent } from './components/gestion organisation/directions/directions.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DrpService } from './components/gestion organisation/services/drp.services';
import { StructureService } from './components/gestion organisation/services/structure.services';
import { TypeStructureService } from './components/gestion organisation/services/typeStructure.services';
import { AttributionCaisseComponent } from './components/gestion caisse/attribution-caisse/attribution-caisse.component';
import { TypeCaisseService } from './components/gestion caisse/services/type-caisse-service.service';
import { CaisseService } from './components/gestion caisse/services/caisse.service';
import { UserService } from './components/gestion caisse/services/user.service';
import { HistoriqueCaisseService } from './components/gestion caisse/services/historiquecaisse.service';
import { TransfertService } from './components/gestion organisation/bureauTransfert.service';
import { AffecterAnnexeComponent } from './components/gestion organisation/affecterAnnexe/affecterAnnexe.component';
import { StructureAnnexeService } from './components/gestion organisation/services/annexe.service';
import { CaissesComponent } from './components/gestion caisse/caisses/caisses.component';
import { OrganisationService } from './components/gestion utilisateur/services/organisation.service';
import { UtilisateursComponent } from './components/gestion utilisateur/utilisateurs/utilisateurs.component';
import { rolesModule } from './components/gestion utilisateur/attributionRole/roles.module';
import {RoleComponent} from './components/gestion utilisateur/attributionRole/role.component';
import { initializeKeycloak } from './service/app.init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { UserconnecteService } from './service/userconnecte.service';
import {MatStepperModule} from '@angular/material/stepper';
import { HistoriqueUserComponent } from './components/gestion utilisateur/historique-user/historique-user.component';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UtilisateursStructureComponent } from './components/gestion utilisateur/utilisateurs-structure/utilisateurs-structure.component';
import {
    AttributionCaisseannexeComponent
} from "./components/gestion caisse/attribution-caisseannexe/attribution-caisseannexe.component";
import { OtheruserComponent } from './components/gestion utilisateur/otheruser/otheruser.component';
import { AgentsadrpComponent } from './components/gestion utilisateur/Users/agentsadrp/agentsadrp.component';
import { AgentReceveurComponent } from './components/gestion utilisateur/Users/agent-receveur/agent-receveur.component';
import { rolesModule3 } from './components/gestion utilisateur/otheruser/roles.module3';
import { rolesModule2 } from './components/gestion utilisateur/structure-users/roles.module2';
import { rolesModule4 } from './components/gestion utilisateur/Users/agent-der/rolesModule4';
import { StructureUsersComponent } from './components/gestion utilisateur/structure-users/structure-users.component';
import { AgentAnnexeComponent } from './components/gestion utilisateur/Users/agent-annexe/agent-annexe.component';
import { AgentDerComponent } from './components/gestion utilisateur/Users/agent-der/agent-der.component';
import { AgentDrpComponent } from './components/gestion utilisateur/Users/agent-drp/agent-drp.component';
import { ProduitsComponent } from './components/gestion produitsServices/produits/produits.component';
import { ServicesComponent } from './components/gestion produitsServices/services/services.component';
import { ProduitService } from './components/gestion produitsServices/serviceback/produit.service';
import { ServiceService } from './components/gestion produitsServices/serviceback/service.service';
import { ProcessusComponent } from './components/gestion produitsServices/processus/processus.component';
import { ProcessusService } from './components/gestion produitsServices/serviceback/processus.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { InterceptorService } from './components/load/interceptor.service';



@NgModule({
    imports: [
        ProgressSpinnerModule,
        MatStepperModule,
        MatButtonModule,
        KeycloakAngularModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        ChipModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TagModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        VirtualScrollerModule,
        AppCodeModule,
        StyleClassModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        rolesModule2,
        rolesModule3,
        rolesModule4,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        DashboardComponent,
        FormLayoutComponent,
        FloatLabelComponent,
        InvalidStateComponent,
        InputComponent,
        ButtonComponent,
        TableComponent,
        ListComponent,
        TreeComponent,
        PanelsComponent,
        OverlaysComponent,
        MenusComponent,
        MessagesComponent,
        MessagesComponent,
        MiscComponent,
        ChartsComponent,
        EmptyComponent,
        FileComponent,
        IconsComponent,
        DocumentationComponent,
        CrudComponent,
        TimelineComponent,
        BlocksComponent,
        BlockViewer,
        MediaComponent,
        PaymentComponent,
        ConfirmationComponent,
        PersonalComponent,
        SeatComponent,
        LandingComponent,
        LoginComponent,
        ErrorComponent,
        NotfoundComponent,
        AccessComponent,
        DrpComponent,
        StructuresComponent,
        AnnexesComponent,
        CentresComponent,
        BureauComponent,
        DirectionsComponent,
        AttributionCaisseComponent,
        AffecterAnnexeComponent,
        CaissesComponent,
        UtilisateursComponent,
        UtilisateursStructureComponent,
        RoleComponent,
        HistoriqueUserComponent,
        AttributionCaisseannexeComponent,
        StructureUsersComponent,
        OtheruserComponent,
        AgentDerComponent,
        AgentDrpComponent,
        AgentReceveurComponent,
        AgentAnnexeComponent,
        AgentsadrpComponent,
        ProduitsComponent,
        ServicesComponent,
        ProcessusComponent,


    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},


        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
          },

        CountryService, CustomerService, EventService, IconService, NodeService, UserconnecteService,
        PhotoService, ProductService, MenuService, ConfigService,MessageService, ConfirmationService,
        DrpService,StructureService, TypeStructureService,TypeCaisseService,CaisseService,UserService, HistoriqueCaisseService, TransfertService,StructureAnnexeService,OrganisationService, ProduitService,ServiceService, ProcessusService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
