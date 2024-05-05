import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Product } from 'src/app/api/product';
import { Processus } from 'src/app/models/processus';
import { Produit } from 'src/app/models/produit';
import { Service } from 'src/app/models/service';
import { ProductService } from 'src/app/service/productservice';
import { ProcessusService } from '../serviceback/processus.service';
import { ProduitService } from '../serviceback/produit.service';
import { ServiceService } from '../serviceback/service.service';

import * as xlsx from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { TypeProduit } from 'src/app/models/typeProduit';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {


   


    produitDialog: boolean;
    processusDialog:boolean;
    editDialog:boolean;





    deleteproduitDialog: boolean = false;

    deleteproduitsDialog: boolean = false;
    deleteProductDialog:boolean = false;

    produits: Produit[];

    produit:Produit
    processuses:Processus[];
    processus:Processus;


    services: Service [];
    processuss: Processus[]

    selectedServices! : any

    selectedProcessus:Processus[]

    processusList=[]
    

    produitprocessus : any[]

    produitservice : any[] 

    submitted: boolean;
   

    rowsPerPageOptions = [5, 10, 20];

    produitSubject = new Subject<void>()
    ExcelData: any;
    produitSelec
    listProcessus
    processuschoisi
    codeProduit
    libelle
    coefficient
    processusByProd: Processus[];
    prod: any;
    obj: any;
    listTypeProduit: any;
    listTypeProduitfiltre: TypeProduit[];
    listTypeProduitFiltre:TypeProduit[];
    typeProduitchoisi:TypeProduit;
    longeur: number;
    donnees: any;
    donnee: any;
    List: any;
    listObj: [];
    monvar: any;
    filtreProce: any;
    listP:any;
    elements: any;
    processusSup=[];
    element: any;
    constructor(private produitService: ProduitService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private serviceService: ServiceService, private processusService:ProcessusService, private http:HttpClient) {}

    ngOnInit() {
        this.typeProduitchoisi;
        this.produit={}
        this.http.get("http://10.14.14.232:8084/module-principal/dg_ProduitAna").subscribe
        (
            (data)=>
            {
                console.log(data)
            }
        )

        this.submitted=false

        this.selectedServices=[]

        console.log(this.produit)
        console.log(this.typeProduitchoisi);

        // this.form=this.formBuilder.group
        // ({
        //     libelle: ['',Validators.required],
        //     codeProduit : ['',Validators.required],
        //     coefficient : ['',Validators.required],
        //   //  processuss: []
        // })

        this.produitSubject.subscribe(
            (data)=>
            {
                this.haveAllProduit()
                this.haveAllTypeProduit()
                this.haveAllprocessus()
              
           
             
              this.haveAllProcessusByProd(this.produit);

               
            }
        )

        this.haveAllProduit()
        this.haveAllTypeProduit()
        this.haveAllProcessusByProd(this.produit);
        this.haveAllprocessus()
       
      

       
        


   
       


        
    }

ReadExcel(event: any)
{

    console.log("heheheh")
    console.log(event)
   // let file=event.target.files[0];

   let file=event.currentFiles[0]
    let fileReader= new FileReader()
    fileReader.readAsBinaryString(file);

    fileReader.onload=(e)=>
    {
        var workBook=xlsx.read(fileReader.result,{type:'binary'})
        var sheetNames=workBook.SheetNames;

        this.ExcelData=xlsx.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

        console.log(this.ExcelData)



        for(let data of this.ExcelData)
        {
          this.produitService.saveProduit(data).subscribe
          ({
            next:(data)=>
            {
                console.log("hum")
                this.produitSubject.next()
             
            },
            error:(err)=>
            {
                console.log(err)
            }
          })
          
        }

       
    
      

    }

    
}

    
    haveAllProduit()
    {
        this.produitService.getAllProduit().subscribe
        (
            {
                next: (data: Produit[]) => 
                
                {
                    this.produits=data
                    console.log(this.produits)
                    

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
    haveAllprocessus()
    {
        this.processusService.getAllprocessus().subscribe
        (
            {
                next: (data: Processus[]) => 
                
                {
                    this.processuss=data
                    console.log(this.processuss)
                    
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

    haveAllProcessusByProd(produit){
        console.log(produit.id)
       
        this.processusService.getProcessusById(produit.id).subscribe
        ({
            next:(data:Processus[])=>
            {
                this.processusByProd=data
                console.log(this.processusByProd);
               
                this.longeur=this.processusByProd.length
                console.log(this.longeur)
                console.log(this.processuss)
              
                for (let index = 0; index < this.processuss.length; index++) {
                   this.elements =this.processuss[index];
                    console.log(this.elements)
                  
                  this.listP=this.elements
                  console.log(this.listP)
                }
               for (let index = 0; index < this.processusByProd.length; index++) {
                this.monvar = this.processusByProd[index];
                this.filtreProce=this.monvar.dg_processus
                console.log( this.filtreProce)

               
                
               }

             if (this.listP.id != this.filtreProce.id) {
                console.log(this.processuss)
             }
              
            },
            error:(error)=>
            {
                this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez recharger la page ou bien contacter le Service Informatique', life: 3000});
            }
            
        })
       
    }

    saveAllProcessusByProd(selectedProcessus){
        this.submitted=true
        console.log(this.produitSelec)
        console.log(selectedProcessus)
      
        for (let index = 0; index < selectedProcessus.length; index++) {
            let element = selectedProcessus[index];
            console.log(element)
            console.log(this.obj);
            this.obj={...this.obj}
           
            this.processusService.getProcessus(element).subscribe((data)=>{
                this.donnee=data
              // console.log(this.donnee.id);
              
              //debugger
              this.processusList.push(this.donnee)
             
             console.log(this.processusList)

               
             this.processusService.saveProcessusByIdProd(this.produitSelec,this.processusList).subscribe
             ({
                 next:(data:any[])=>
                 
                 {
                     this.processusByProd=data
                     //if(this.processusList==)
                     console.log(this.processusByProd);
                     this.messageService.add({severity: 'erreur', summary: 'inserertion ', detail: 'insertion avec succuss', life: 3000});
                    
                     this.hideDialog()
                    
                 
                 },
                 error:(error)=>
                 {
                     this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez recharger la page ou bien contacter le Service Informatique', life: 3000});
                 }
                 
             })
     
           
             this.processusList=[]
              
               
            })
          

               
        }
        this.selectedProcessus=null
       
        
     }
    
//   afficheProcessus(produit){
//     this.produit={...produit}
//     console.log(produit)
//     this.produitService.getProcessusByProduit(produit.id).subscribe((data)=>{
//         console.log(produit)
//         this.listProcessus=data
//         console.log(this.listProcessus)
       
        
//     })
   
 // }

 

// test()
// {
//     console.log(this.selectedServices)
//     console.log(this.selectedProcessus)

    

    
// }

onSubmit()
    {
    this.submitted=true;


this.produit.dg_typeproduit=this.typeProduitchoisi

console.log(this.typeProduitchoisi);
console.log(this.produit)



if (this.produit.libelle.trim()) {
    if(this.produit)
        {
        this.produitService.saveProduit(this.produit).subscribe
        ({
                next:(data)=>
                {
                    console.log(data)
                    this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element inséré avec success', life:3000})
                    this.haveAllProduit();
                    this.hideDialog();
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

       modifierProduit(produit){
        this.submitted=true;
        console.log(this.produit)
        if (this.produit.libelle.trim()) {
            this.produitService.putProduit(this.produit).subscribe
        (
            {
                next:(data:Produit)=>
                {
                    this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element modifié avec success', life:3000})
                    this.haveAllProduit()
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
        
    deleteProcessus(process:Processus) {
        this.deleteProductDialog = true;
        this.processus = {...process};
        console.log(process)
        this.processusSup.push(process)
        console.log( this.processusSup)
       for (let index = 0; index < this.processusSup.length; index++) {
        this.element = this.processusSup[index];
        console.log( this.element.dg_processus.id)
        console.log(  this.element.dg_produitAna.id)
        
       }
       console.log( this.element.dg_processus.id)
       console.log(  this.element.dg_produitAna.id)
    }
    

    confirmDelete(){
        console.log( this.element.dg_processus.id)
       console.log(  this.element.dg_produitAna.id)
        // this.processus = {...process};
        // console.log(process)
        // this. haveAllProcessusByProd(this.produit)
        //    console.log(this.processusByProd)
          
        //    for (let index = 0; index < this.processusByProd.length; index++) {
        //      this.elements = this.processusByProd[index];
        //      console.log(this.elements)
        //     // this.elements={...this.elements}
        //      console.log(this.elements.dg_processus.id)
        //      console.log(this.elements.dg_produitAna.id)
             
             this.deleteProductDialog = false;
        //      //this.produits = this.produits.filter(val => val.id !== this.produit);  
        //    }
        //    console.log(this.elements.dg_processus.id)
        //    console.log(this.elements.dg_produitAna.id)
           
           this.processusService.deleteProduit(this.element.dg_processus.id,this.element.dg_produitAna.id).subscribe((data)=>{
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Produit Supprimé avec Success', life: 3000});
 
        })
      
       
        
         //this.produit = {};
     }
   
        
    haveAllTypeProduit(){
        this.produitService.AllTypeProduit().subscribe((data)=>{
            this.listTypeProduit= data;
            console.log(this.listTypeProduit);
        })
    }

    
filterTypeProduit(event) {
    console.log(this.listTypeProduit)
      const filtered:TypeProduit[]= [];
              const query = event.query;
              for (let i = 0; i < this.listTypeProduit.length; i++) {
                  const typeproduit = this.listTypeProduit[i];
                  if (typeproduit.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                      filtered.push(typeproduit);
                  }
              }
    
              this.listTypeProduitfiltre = filtered;
              console.log( this.listTypeProduitfiltre)
    
    }

    filter2TypeProduit(event) {
        console.log(this.listTypeProduit)
          const filter:TypeProduit[]= [];
                  const query = event.query;
                  for (let i = 0; i < this.listTypeProduit.length; i++) {
                      const typeproduit = this.listTypeProduit[i];
                      if (typeproduit.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filter.push(typeproduit);
                      }
                  }
        
                  this.listTypeProduitFiltre = filter;
                  console.log( this.listTypeProduitFiltre)
        
        }
    
    


 

    openNew() {
        this.produit = {};

        this.produitprocessus=[]
        this.produitservice=[]
       
        
        this.submitted = false;
        this.produitDialog = true;
        //this.processusDialog=true;
       
    }
    openNew2(prod) {

        console.log(prod)
        this.obj=prod
        this.produitSelec= prod.id
        console.log(this.produitSelec)
        
       
        this.submitted = false;
      
      
       console.log(this.processuss)
       this.haveAllProcessusByProd(prod);
       console.log(this.processusByProd)
      
       console.log(this.processuss)
        this.processusDialog=true;

     
    }

    open3New() {
        this.produit = {};

        this.produitprocessus=[]
        this.produitservice=[]
       
        
        this.submitted = false;
       
        
        this.editDialog=true;
    }

    

    editProduit(produit:Produit) {
        this.produit={...produit}
        console.log(produit)
        this.editDialog=true;
    }

    hideDialog() {
        this.produitDialog = false;
        this.submitted = false;
        this.processusDialog=false;
        this.editDialog=false;
    }

   
}
