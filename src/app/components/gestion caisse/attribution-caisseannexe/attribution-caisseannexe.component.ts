import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CaisseService} from "../services/caisse.service";
import {MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {HistoriqueCaisseService} from "../services/historiquecaisse.service";
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-attribution-caisseannexe',
  templateUrl: './attribution-caisseannexe.component.html',
  styleUrls: ['./attribution-caisseannexe.component.scss']
})
export class AttributionCaisseannexeComponent implements OnInit {


    structannexe
    listcaissesannexe
    caisse
    users=[]
    caisseDialog=false
    tempusers=[]
    listUser
    idstructureSelected 

    userSelected
    private submitted: boolean;
     caisseSubject = new Subject<void>();
     userSubject = new Subject<void>();
    private hasCaisse=false;
    detailsDialog
    private caisseListHistoriqueCaisse: any[];
    listRoles

  constructor(private router:Router, private http: HttpClient, private caisseservice : CaisseService, private messageService: MessageService, private historiquecaisseservice: HistoriqueCaisseService, private keycloakservice: KeycloakService ) { }

  ngOnInit(): void {

    this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles

      this.structannexe=JSON.parse(sessionStorage.getItem('annexe'))

      if(this.structannexe==null)
      {
          this.router.navigate(['/caisse/attributionCaisse'])
      }



      console.log(this.structannexe)

      this.caisseSubject.subscribe(

          ()=>
          {

      this.http.get(environment.apiUrl+'/dg_Caisse/structure/'+this.structannexe.annexe.id).subscribe(
          (data)=>
          {
              this.listcaissesannexe=data
              console.log(this.listcaissesannexe)
          }

      )
            })

      this.caisseSubject.next()


      this.userSubject.subscribe(
          ()=>
          {
              this.http.get(environment.apiUrl+'/dg_User/structure/'+this.structannexe.annexe.id).subscribe(
                  (data:any[])=>
                  {
                      this.users=data

                      this.users=this.users.filter(user=>user.dg_caisse==null )
                      this.tempusers=this.users
                      console.log(this.users)
                  }
              )
          }
      )

      this.userSubject.next()

  }

    hideDialog()
    {
        this.caisseDialog = false;
        this.submitted = false;

    }

    saveCaisse()
    {
        this.submitted = true;
        this.caisseservice.affecterCaisse(this.caisse,this.userSelected).subscribe
        (
            (data1)=>
            {
                console.log(data1)
                this.messageService.add({severity:'success', summary:'Successful', detail:'Caisse Affecté', life:3000})

                this.caisseSubject.next()
                this.userSubject.next()

            },
            (err)=>
            {
                this.messageService.add({severity:'error', summary:'Error', detail:'Erreur d\'affectation', life:3000})
            }
        )

        console.log(this.caisse)




        this.caisseDialog=false



    }


    findRole(listrole) {
        let retour = false
        for (let rol1 of listrole) {
    
          if (this.listRoles.find(role => role === rol1) != undefined) {
            retour = true
          }
        }
        return retour
      }


  editCaisse(caisse)
  {

      
console.log(this.users)


this.caisseDialog=true;
this.caisse= {...caisse}
console.log(this.caisse)


console.log(this.listcaissesannexe)


this.idstructureSelected=this.caisse.dg_structure.id


this.userSubject.subscribe(
    ()=>
    {
        this.http.get(environment.apiUrl+"/dg_User/structure/"+this.idstructureSelected).subscribe(
            (data: any[])=>
            {
                this.users=data
                this.users=this.users.filter(user=>user.dg_caisse==null)

                console.log(this.users)

                this.tempusers=this.users



/*
                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("receveur")== true)
                {
                    this.users=this.users.filter(user=>user.fonction.libelle.toLowerCase().includes("receveur")==true)
                }

                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("annexe")== true)
                {
                    this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_RESPONSABLE_ANNEXE')!=undefined)
                }
                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("arriere")== true)
                {
                    this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_ARRIERE')!=undefined)
                }

                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("grande")== true)
                {
                    this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_GRANDECAISSE')!=undefined)
                }
                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("guichet")== true)
                {
                    this.users=this.users.filter(user=>user.roles.find(role=> role.authority=='ROLE_GUICHET')!=undefined)
                }
                */

                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("receveur")== true)
                {
                    this.users=this.users.filter(user=>user.dg_fonction.libelle.toLowerCase().includes("receveur")==true)

                    
                }

                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("annexe")== true)
                {
                  this.users=this.users.filter(user=>user.dg_fonction.libelle.toLowerCase().includes("annexe")==true)
                }
                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("arriere")== true)
                {
                  this.users=this.users.filter(user=>user.dg_fonction.libelle.toLowerCase().includes("arriere")==true)

                  
                }

                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("grande")== true)
                {
                  this.users=this.users.filter(user=>user.dg_fonction.libelle.toLowerCase().includes("grande")==true)
                }
                if(this.caisse.dg_typeCaisse.libelle.toLowerCase().includes("guichet")== true)
                {
                  this.users=this.users.filter(user=>user.dg_fonction.libelle.toLowerCase().includes("guichet")==true)
                  console.log("fii")
                }


                if(this.users.length==0)
                {
                  this.messageService.add({severity: 'warn', summary: 'Pas d utilisateur disponibles pour cette caisse', life: 3000});
                 
                }
                
            }
        )

    }
)

this.userSubject.next()








//console.log(this.users)

  }
    filterUser(event)
    {

        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            user.libelle= user.nom + " " +user.prenom

            if (user.libelle.toLowerCase().indexOf(query) == 0) {


                filtered.push(user);
            }
        }

        this.listUser = filtered;

    }
    cloturerCaisse()
    {
        /* OLD ONE
      this.historiqueCaisse = {}
      this.historiqueCaisse.dg_user=this.caisse.dg_user
      this.historiqueCaisse.dg_caisse=this.caisse
      this.historiqueCaisse.datecloture= new Date();

      this.caisse.dg_user=null
      console.log(this.caisse)






      this.caisseservice.putCaisse(this.caisse).subscribe
      (
          (data1)=>
          {
              console.log(data1)

              this.historiquecaisseservice.saveHistoriqueCaisse(this.historiqueCaisse).subscribe
              (
                  (data2)=>
                  {
                      console.log(data2)

                      this.caisseSubject.next()
                  }
              )
          }
      )

      */

        let lastHistoCaisse=this.caisseListHistoriqueCaisse[this.caisseListHistoriqueCaisse.length-1]

        for(let histo of this.caisseListHistoriqueCaisse)
        {

            console.log(histo)



            if(lastHistoCaisse.id<=histo.id)
            {
                lastHistoCaisse=histo
            }
        }

        this.caisseservice.cloturerCaisse(lastHistoCaisse).subscribe
        ({
            next:(data)=>
            {
                console.log(data)

                this.messageService.add({severity:'success', summary:'Successful', detail:'Caisse Cloturé', life:3000})

                this.caisseSubject.next()

                this.userSubject.next()

            },
            error:(err)=>
            {
                console.log(err)

                this.messageService.add({severity:'error', summary:'Error', detail:'Erreur de cloture', life:3000})
            }

        })


        this.detailsDialog=false

    }



    details(caisse)
    {
        this.caisse={...caisse}

        this.hasCaisse=false

        if(this.caisse.dg_user != null || this.caisse.dg_user !=undefined)
        {
            this.hasCaisse=true
        }

        console.log(caisse)
        this.detailsDialog=true


        this.historiquecaisseservice.getAllHistoriqueCaisseByid(caisse).subscribe
        (
            (data :any)=>
            {
                this.caisseListHistoriqueCaisse=data
                console.log(this.caisseListHistoriqueCaisse)

            }

        )

    }
}
