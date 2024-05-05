import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Directions } from 'src/app/models/directions';
import { Roles } from 'src/app/models/roles';
import { Structure } from 'src/app/models/structure';
import { Users } from 'src/app/models/users';

@Injectable({
    providedIn:'root'
})
export class Sauvegarde {
    StructureInformation: Structure[];
    Structure_Information: Structure;

    UsersInformation: Users[];
    Users_Information: Users;


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
        this.Structure_Information={};
        this.Users_Information={};
        this.RoleInformation=[];
    }
}
