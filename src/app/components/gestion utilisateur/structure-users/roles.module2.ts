import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";
import { ListboxModule } from "primeng/listbox";
import { PickListModule } from "primeng/picklist";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { AppCodeModule } from "../../app-code/app.code.component";
import { DrpComponent } from "./drp.component";
import { StructureUsersComponent } from "./structure-users.component";
import { StructuresComponent } from "./structures.component";
import { UsersComponent } from "./users.component";
import {InputNumberModule} from 'primeng/inputnumber';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    declarations: [
        StructuresComponent,
        UsersComponent,
        DrpComponent
    ],
    imports: [
        ProgressSpinnerModule,
        ListboxModule,
        ToggleButtonModule,
        DialogModule,
        ToolbarModule,
        StepsModule,
        TabViewModule,
        AppCodeModule,
        CardModule,
        InputTextModule,
        InputNumberModule,
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
        PickListModule,
        RouterModule.forChild([
            {path:'',component: StructureUsersComponent, children: [
                    {path:'', redirectTo: 'Drp', pathMatch: 'full'},
                    {path: 'Drp', component: DrpComponent},
                    {path: 'structures', component: StructuresComponent},
                    {path: 'users', component: UsersComponent}
                ]}
        ])
    ],
    exports: [RouterModule]
})
export class rolesModule2 { }
