import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
   return () =>
        keycloak.init({
            config: {
               clientId:'frontprincipal',
            // clientId:'frontprincipal_local',
             realm: 'Digital-Poste',

            // realm: 'Digital_post',
                // url: 'http://digipost.sn.post:8082/auth'
                  url: 'http://10.14.14.232:8180/auth',
               // url: 'http://localhost:8080/auth'
                //url: 'http://localhost:8180/auth',
             //url: 'http://10.10.1.194:9990/auth/'
            //url:'http://10.10.3.136:9990/auth/'

            },
            initOptions: {
                checkLoginIframe: false,
                onLoad: 'check-sso'
            },
            loadUserProfileAtStartUp: true
        });
}
