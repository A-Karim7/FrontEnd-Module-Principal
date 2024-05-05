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
import { AgentAnnexeComponent } from "./agent-annexe.component";
import { Users_annexeComponent } from "./users_annexe.component";

@NgModule({
    declarations: [
        Users_annexeComponent,
    ],
    imports: [
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
            {path:'',component: AgentAnnexeComponent, children: [
                    {path:'', redirectTo: 'Users', pathMatch: 'full'},
                    {path: 'Users', component: Users_annexeComponent},
                ]}
        ])
    ],
    exports: [RouterModule]
})
export class rolesModule7 { }
