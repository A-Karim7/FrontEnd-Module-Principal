import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/api/customer';
import { Product } from 'src/app/api/product';
import { Modif } from 'src/app/models/modif';
import { Users } from 'src/app/models/users';
import { CustomerService } from 'src/app/service/customerservice';
import { ProductService } from 'src/app/service/productservice';
import { LoaderService } from '../../load/loader.service';
import { OrganisationService } from '../services/organisation.service';

@Component({
  selector: 'app-historique-user',
  templateUrl: './historique-user.component.html',
  styleUrls: ['./historique-user.component.scss']
})
export class HistoriqueUserComponent implements OnInit {
   
    historique : Modif;
    user: Users[];
    utilisateur: Users
    cols: any[];
    tableau: Modif[];
    nombre: number;
    showSpinner=false;
    constructor(private organisationService: OrganisationService, private messageService: MessageService,public loaderService: LoaderService) {}
   
    ngOnInit() {
        setTimeout(() => {
       
        this.organisationService.getAllUsers().subscribe(
            (data) => {
                this.user = data;
                this.user = this.user.filter(use => use.dg_structure.id === this.utilisateur.dg_structure.id);
            }
        
        );
        this.historique
    
    },1000);
}
      Historique(utilisateur: Users){
        this.utilisateur = utilisateur;
        this.organisationService.getModifUser(this.utilisateur.id).subscribe(
            (data)=>
            {
                this.historique=data;
                console.log(this.historique)
            },
            (error)=>
            {
                this.messageService.add({severity: 'error', summary: 'Echec', detail: 'Une erreur s\'est produit au niveau de l\'affichage', life: 3000});
            }
        )
    }
  
        
}       
