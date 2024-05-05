import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';
import { SeatComponent } from './seat.component';
import { PersonalComponent } from './personal.component';
import { ConfirmationComponent } from './confirmation.component';
import { MenusComponent } from './menus.component';
import {KeycloakService} from "keycloak-angular";


export function  test()
{

    let keycloak = new KeycloakService()
    let listroles = JSON.parse(sessionStorage.getItem('listroles'))


console.log(listroles)


    let retour="personal"

    if(listroles.includes("ROLE_DR"))
    {

    }
    if(listroles.includes("ROLE_DRP")) {
        retour = "seat"

    }



    return retour



}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([

        {path:'',component: MenusComponent, children:[
				{path:'', redirectTo: 'personal', pathMatch: 'full'},
				{path: 'personal', component: PersonalComponent},
				{path: 'confirmation', component: ConfirmationComponent},
				{path: 'seat', component: SeatComponent},
				{path: 'payment', component: PaymentComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})


export class MenusModule implements OnInit{

    constructor(public keycloak: KeycloakService) {



    }

    ngOnInit() {

        alert("HEHEHEH")
        console.log(this.keycloak.getKeycloakInstance().realmAccess.roles)

        sessionStorage.setItem("listroles",JSON.stringify(this.keycloak.getKeycloakInstance().realmAccess.roles))
    }


    test()
    {

    }





}
