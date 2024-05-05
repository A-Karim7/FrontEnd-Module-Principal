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
import { AgentDerComponent } from "./agent-der.component";
import { Drp_derComponent } from "./drp_derComponent";
import { User_derComponent } from "./user_derComponent";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    declarations: [
        Drp_derComponent,
        User_derComponent
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
            {path:'',component: AgentDerComponent, children: [
                    {path:'', redirectTo: 'Drp', pathMatch: 'full'},
                    {path: 'Drp', component: Drp_derComponent},
                    {path: 'Users', component: User_derComponent}
                ]}
        ])
    ],
    exports: [RouterModule]
})
export class rolesModule4 { }
