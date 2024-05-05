import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ServiceService } from '../serviceback/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  form : FormGroup

  serviceDialog: boolean;

  deleteserviceDialog: boolean = false;

  deleteservicesDialog: boolean = false;

  services: Service[];

  service: Service;


  submitted: boolean;
 

  rowsPerPageOptions = [5, 10, 20];

  serviceSubject = new Subject<void>()

  constructor(private serviceService: ServiceService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private formBuilder: FormBuilder) {}

  ngOnInit() {

      this.submitted=false


      console.log(this.service)

      this.form=this.formBuilder.group
      ({
          libelle: ['',Validators.required],
         
      })

      this.serviceSubject.subscribe(
          (data)=>
          {
              this.haveAllservice()
          }
      )

      this.haveAllservice()
     


      
  }
  
  haveAllservice()
  {
      this.serviceService.getAllService().subscribe
      (
          {
              next: (data: Service[]) => 
              
              {
                  this.services=data
              },
              
              error: (error) => 
              {
                  this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez recharger la page ou bien contacter le Service Informatique', life: 3000});
              },
              complete: () =>
              {
           //       this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element inséré avec success', life:3000})
              }
          }
      )
  }

  onSubmit()
  {
      this.submitted=true
      console.log(this.form)

if(this.form.status=="VALID")
{



      console.log(this.form.value)

      if(this.service.id ==undefined)
      {
      this.serviceService.saveService(this.form.value).subscribe
      (
          {
              next:(data)=>
              {
                  this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element inséré avec success', life:3000})
                  this.haveAllservice()
                  this.hideDialog()
              },
              error:(data)=>
              {
                  this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez refaire une opération ou bien contacter le Service Informatique', life: 3000});

                  this.hideDialog()
              }
          }
          
      )
      }
      else
      {


          this.serviceService.putService(this.service.id,this.form.value).subscribe
      (
          {
              next:(data)=>
              {
                  this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element modifié avec success', life:3000})
                  this.haveAllservice()
                  this.hideDialog()
              },
              error:(data)=>
              {
                  this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez refaire une opération ou bien contacter le Service Informatique', life: 3000});
                  this.hideDialog()

              }
          }
          
      )
          

      }
  }


  }

  openNew() {
      this.service = {};
      this.submitted = false;
      this.serviceDialog = true;
  }

  

  editservice(service: Service) {
      this.service = {...service};
      this.serviceDialog = true;
  }

  

  hideDialog() {
      this.serviceDialog = false;
      this.submitted = false;
  }

 
}
