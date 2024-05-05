import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
          //   redirectUri: window.location.origin + "/frontend",
           //redirectUri: window.location.origin  + state.url+ "/frontend/",
        //redirectUri:"http://10.14.14.232:8084/frontend/"
          redirectUri: 'http://digipost.sn.post:8085/frontend/',
      });
    }
// Get the roles required from the route.
const requiredRoles = route.data.roles;


// Allow the user to to proceed if no additional roles are required to access the route.
if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
    return true;
}
console.log(requiredRoles.every((role) => this.roles.includes(role)))

let listrole= //JSON.parse(localStorage.getItem("role"))
this.keycloak.getKeycloakInstance().realmAccess.roles
// return listrole.every((role) => this.roles.includes(role));
console.log(requiredRoles)
let istrouve=false
for( let rol of requiredRoles)
{
    if(listrole.find(role=>role===rol)!=undefined)
    {
    istrouve= true
    }

}
return istrouve

// Allow the user to proceed if all the required roles are present.
return requiredRoles.every((role) => this.roles.includes(role));

}
}
