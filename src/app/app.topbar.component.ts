import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UserconnecteService } from './service/userconnecte.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    email 
    items: MenuItem[];

    user

    constructor(public appMain: AppMainComponent, private keycloak: KeycloakService, private http: HttpClient, private userconnecte : UserconnecteService) {

       

            this.userconnecte.getUser().then(
                (data) => {
                    this.user=data
                    console.log(this.user)
                }
            )

        
     }
     

    /* constructor(public appMain: AppMainComponent)
     {

     }
     */

     deconnection() {
        this.keycloak.logout(window.location.origin +"/frontend/");
        // this.keycloak.logout(window.location.origin );


}
}
