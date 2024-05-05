import { HttpClient } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Roles } from "src/app/models/roles";
import { Users } from "src/app/models/users";
import { environment } from "src/environments/environment.prod";
import { OrganisationService } from "../services/organisation.service";
import {Sauvegarde} from "./Sauvegarde";
import {Userprime} from "../../../models/userprime";


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
    titre2: any;
    utilisateurs: Users[];
    last: any;
    lastStr: any;

    constructor(public sauvegarde: Sauvegarde, private organisationService: OrganisationService, private router: Router, private http : HttpClient) { }
    attente: boolean;
    dialogVisible: boolean
    user: Users[];
    userF:Users[];
    utilisateur: Users;
    roles:Roles[];
    selectedUsers: Users[];
    titre: string;

    structure

    seats: any[];

    annexe?: any
    annexes? : any[]

    seatInformation: any;
    nombre:number;

    ngOnInit() {

        this.dialogVisible=false

        this.annexes=[]
        if(!this.sauvegarde.Structure_Information || this.sauvegarde.Structure_Information=={}){
            this.router.navigate(['utilisateurs/attributionroles']);
        }
        else{

            this.structure=this.sauvegarde.Structure_Information

            console.log(this.structure)


            if(this.structure.dg_structureBureau.length!=0)
            {
                console.log("humhum")
                this.annexes=this.structure.dg_structureBureau

                console.log(this.annexes)
            }



            this.nombre=this.sauvegarde.Structure_Information.id;
            this.titre=this.sauvegarde.Structure_Information.libelle;
        }

        this.organisationService.getAllRoles().subscribe(
        (data)=>{
            this.roles=data;
        }
    );
        if (this.sauvegarde.Structure_Information){
            this.organisationService.getAllUsers().subscribe(
                (data) => {
                    this.user = data;
                    this.user = this.user.filter(use => use.dg_structure.id === this.sauvegarde.Structure_Information.id);
                    this.attente=true;
                }
            );
        }
        else {}
    }

    showdialog(annexe)
    {

        this.dialogVisible = true;
        this.titre2=annexe.annexe.libelle
       this.http.get(environment.apiUrl+"/dg_User/structure/"+annexe.annexe.id).subscribe(
            (data: any[]) => {
                this.utilisateurs = data;

                console.log(this.utilisateurs)

            }
        );
    }

    prevPage() {
        this.router.navigate(['utilisateurs/attributionroles/structures']);
    }
    nextPage(utilisateur: Users) {
        console.log(this.utilisateur);
        this.utilisateur = {...utilisateur};
        this.sauvegarde.Users_Information = this.utilisateur;
        this.sauvegarde.temp=this.utilisateur.roles;
            this.router.navigate(['utilisateurs/attributionroles/roles']);
    }
}
