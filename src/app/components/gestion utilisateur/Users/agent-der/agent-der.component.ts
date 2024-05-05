import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { MenuItem } from "primeng/api";
import { Drp } from "src/app/models/drp";
import { Users } from "src/app/models/users";
import { OrganisationService } from "../../services/organisation.service";
import { Sauvegarde } from "./Sauvegarde";

@Component({
  selector: 'app-agent-der',
  templateUrl: './agent-der.component.html',
  styleUrls: ['./agent-der.component.scss']
})
export class AgentDerComponent implements OnInit {
    items: MenuItem[];
    utilisateur: Users;
    drps: Drp[];
    listRoles;
    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService ,private keycloakservice: KeycloakService) { }
    ngOnInit() {
        this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
        this.organisationService.getAllUsersEmail(this.keycloakservice.getKeycloakInstance().profile.username).subscribe(
            (data)=>{
                this.utilisateur=data;
                this.sauvegarde.Users_der_Information=this.utilisateur;
                console.log(this.utilisateur)
            }
        );
        this.items = [
            {label: 'Drp', routerLink: 'Drp'},
            {label: 'Utilisateurs', routerLink: 'Users'},
        ];
    }
}
