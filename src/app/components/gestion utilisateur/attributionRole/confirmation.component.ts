import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Sauvegarde} from "./Sauvegarde";
import {HttpClient} from "@angular/common/http";
import { Roles } from "src/app/models/roles";
import { Users } from "src/app/models/users";
import { MessageService } from "primeng/api";
import { environment } from "src/environments/environment.prod";

@Component({
    selector: 'app-confirmation',
    template:`
        <div class="col-12 lg:col-8">
            <div class="card">
               <h3 class="bg-gray-200 p-3" >Confirmation</h3>
                        <h4 class="row justify-content-center custom-line" *ngIf="utilisateur">{{utilisateur.prenom}} {{utilisateur.nom}} ({{utilisateur.email}})</h4>
                            <p>Ancien(x) rôle(s)
                                <div *ngIf="utilisateur">
                                    <span *ngFor="let rol of utilisateur.roles">
                                        <span>{{rol.authority}} : {{rol.description}}</span>
                                    </span>
                                </div>
                            <p>Nouveau(x) rôle(s)
                            <div *ngFor="let rol of roles$">
                                <span>{{rol.authority}} : {{rol.description}}</span>
                            </div>

                        <div>
                            <p-button label="Précèdent" (onClick)="prevPage()" icon="pi pi-angle-left" iconPos="left" class="p-toolbar-group-right"></p-button>
                            <button pButton pRipple type="button" label="Confirmer" class="p-button-success mr-2 mb-2" (click)="complete()"></button>
                        </div>
                   </div>
        </div>`
})



export class ConfirmationComponent implements OnInit {
    utilisateur: Users;
    roles:Roles;
    role:Roles[];
    roles$:Roles[];
    constructor(private http: HttpClient, public sauvegarde: Sauvegarde, private router: Router, private messageService: MessageService) { }

    ngOnInit() {
        if(!this.sauvegarde.RoleInformation || this.sauvegarde.RoleInformation==[]){
            this.router.navigate(['Roles/structures']);
        }
        this.utilisateur=this.sauvegarde.Users_Information;
        this.roles$=this.sauvegarde.RoleInformation;
    }

    complete() {
        this.utilisateur.roles=this.sauvegarde.RoleInformation;
        console.log(this.utilisateur);
        this.http.put<Users>(environment.apiUrl+`/dg_User/${this.utilisateur.id}`, this.utilisateur).subscribe(data => {
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Affectation réussi', life: 3000});
        });
        console.log(this.utilisateur);
       // this.sauvegarde.complete();
        this.router.navigate(['utilisateurs/attributionroles/roles']);
    }

    prevPage() {
        this.router.navigate(['utilisateurs/attributionroles/roles']);
    }
}
