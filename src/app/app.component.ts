import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';
import { UserconnecteService } from './service/userconnecte.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';
    email

    user

   // constructor(private primengConfig: PrimeNGConfig, private keycloak: KeycloakService, private userconnecte: UserconnecteService) { }

   constructor(private primengConfig: PrimeNGConfig , private userconnecte: UserconnecteService, private keycloak: KeycloakService, private http: HttpClient )
   {


    }
   /*


   async ngOnInit() {

        console.log(this.keycloak.getKeycloakInstance().profile.email)

        this.email= this.keycloak.getKeycloakInstance().profile.email
        console.log(this.email)

       console.log( this.userconnecte.user)


        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
    */


      ngOnInit() {

console.log("HAAAAAAAAAAA")

     /*   this.http.get(environment.apiUrl+'/dg_User/structure_annexe/3').subscribe
        (
            (data)=>
            {
                console.log(data)
            }
        )

        this.http.get(environment.apiUrl+'/dg_Caisse/structure_annexe/3').subscribe
        (
            (data)=>
            {
                console.log(data)
            }
        )

        this.http.get(environment.apiUrl+'/dg_Structure/3').subscribe
        (
            (data)=>
            {
                console.log(data)
            }
        )

        this.http.get(environment.apiUrl+'/dg_Structure/9').subscribe
        (
            (data)=>
            {
                console.log(data)
            }
        )

      */


console.log(this.keycloak.getKeycloakInstance().realmAccess.roles)


        this.email= this.keycloak.getKeycloakInstance().profile.username
   /*    if(this.keycloak.getKeycloakInstance().authenticated)
       {
           */

            this.http.get(environment.apiUrl+"/dg_User/email/"+this.email).subscribe
            (
                (data)=>
                {
                    this.user=data

                    localStorage.setItem('user', JSON.stringify(this.user))


                }
            )







      this.userconnecte.getDrp().then(data => console.log(data))
      this.userconnecte.getUser().then((data) =>
        {


        this.user=data
        console.log(this.user)
        }
        )
    }
}
