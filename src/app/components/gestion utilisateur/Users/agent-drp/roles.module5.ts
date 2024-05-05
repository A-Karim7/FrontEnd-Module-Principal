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
import { AppCodeModule } from "src/app/components/app-code/app.code.component";
import { AgentDrpComponent } from "./agent-drp.component";
import { Structures_drpComponent } from "./structures_drp.component";
import { Users_drpComponent } from "./users_drp.component";
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [
        Structures_drpComponent,
        Users_drpComponent
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
            {path:'',component: AgentDrpComponent, children: [
                    {path:'', redirectTo: 'Structures', pathMatch: 'full'},
                    {path: 'Structures', component: Structures_drpComponent},
                    {path: 'Users', component: Users_drpComponent},
                ]}
        ])
    ],
    exports: [RouterModule]
})
export class rolesModule5 { }
