// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//pour le deploiement : fichier topbar ligne deconnexion
//pour le deploiement : fichier authgard ligne redirectUri
//pour le deploiement : fichier app.init ligne origin


export const environment = {
  production: false,
 //apiUrl: "http://localhost:8081",

//  apiUrlComptaAnalytique: "http://10.14.14.232:8084/comptaAnalytique-backend",

//  apiUrlComptaGeneral: "http://10.14.14.232:8084/comptaGenerale-backend",


//  apiUrl: "http://digipost.sn.post:8085/module-principal",
        apiUrl: "http://10.14.14.232:8084/module-principal"


 //apiUrl:"http://localhost:3000"


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
