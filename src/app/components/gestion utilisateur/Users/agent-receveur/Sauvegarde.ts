import { Injectable } from "@angular/core";
import { Drp } from "src/app/models/drp";
import { Roles } from "src/app/models/roles";
import { Structure } from "src/app/models/structure";
import { Users } from "src/app/models/users";

@Injectable({
    providedIn:'root'
})
export class Sauvegarde {
    DrpInformation: Drp[];
    Drp_der_Information: Drp;

    StructureInformation: Structure[];
    Structure_rcv_Information: Structure;

    Users_rcv_Information: Users;


    RoleInformation: Roles[];
    temp: Roles[];
    Role_Information: Roles;

    /*
        Structure = {
           // StructureInformation= ,
            seatInformation: {
                class: null,
                wagon: null,
                seat: null
            },
            paymentInformation: {
                cardholderName:'',
                cardholderNumber:'',
                date:'',
                cvv:'',
                remember:false
            }
        };

        private paymentComplete = new Subject<any>();

        paymentComplete$ = this.paymentComplete.asObservable();
    */
    /*
        setStructureInformation(StructureInformation) {
           // this.StructureInformation = StructureInformation;
        }
    */
    complete() {
        this.Structure_rcv_Information={};
        this.Users_rcv_Information={};
        this.RoleInformation=[];
    }
}
