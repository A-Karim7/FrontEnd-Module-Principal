import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation.component';
import {RoleComponent} from "./role.component";
import {StructuresComponent} from "./structures.component";
import {UsersComponent} from "./users.component";
import {RolesComponent} from "./roles.component";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {AutoComplete, AutoCompleteModule} from "primeng/autocomplete";
import {StepsModule} from 'primeng/steps';
import {ToastModule} from "primeng/toast";
import {CheckboxModule} from "primeng/checkbox";
import {InputMaskModule} from "primeng/inputmask";
import {InputTextModule} from "primeng/inputtext";
import {TabViewModule} from "primeng/tabview";

import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card"

import {BrowserModule} from "@angular/platform-browser";
import {TableModule} from "primeng/table";
import {PickListModule} from "primeng/picklist";
import { AppCodeModule } from '../../app-code/app.code.component';
import { DialogModule } from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    declarations: [
        ConfirmationComponent,
        RolesComponent,
        UsersComponent,
        StructuresComponent,
    ],
    imports: [
        ProgressSpinnerModule,
        StepsModule,
        TabViewModule,
        AppCodeModule,
        CardModule,
        InputTextModule,
        DropdownModule,
        InputMaskModule,
        CheckboxModule,
        ToastModule,
        FormsModule,
        TableModule,
        CommonModule,
        AutoCompleteModule,
        ButtonModule,
        TableModule,
        TabViewModule,
        DialogModule,
        PickListModule,
        RouterModule.forChild([
            {path:'',component: RoleComponent, children:[
                    {path:'', redirectTo: 'structures', pathMatch: 'full'},
                    {path: 'structures', component: StructuresComponent},
                    {path: 'users', component: UsersComponent},
                    {path: 'roles', component: RolesComponent},
                    {path: 'confirmation', component: ConfirmationComponent}
                ]}
        ])
    ],
    exports: [RouterModule]
})
export class rolesModule { }

