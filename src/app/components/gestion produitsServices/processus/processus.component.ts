import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Processus } from 'src/app/models/processus';
import { ProcessusService } from '../serviceback/processus.service';
import * as xlsx from 'xlsx';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from '../serviceback/produit.service';


@Component({
  selector: 'app-processus',
  templateUrl: './processus.component.html',
  styleUrls: ['./processus.component.scss']
})
export class ProcessusComponent implements OnInit {


  

  processusDialog: boolean;
  editDialog:boolean;
  deleteprocessusDialog: boolean = false;
  produitDialog:boolean=false;
 

  deleteprocessussDialog: boolean = false;
  deleteProductDialog: boolean = false;

  processuss: Processus[];
 // proc:Processus
  processus:Processus;

  produits : Produit[];
  produit : Produit

  selectedProduit : Produit[];

  submitted: boolean;
 code
 libelle
 codep

  rowsPerPageOptions = [5, 10, 20];

  processusSubject = new Subject<void>()
    ExcelData: any;
    produitByProcess: Processus[];
    list: Produit[];
    elements: any;
    donnee: Object;
    processusSelec: any;
    produitList=[]
    produitByProcessus: Produit[];
    obj: any;
    prod: Produit;
    proc:Processus;
    produitSup=[];
  
  constructor(private processusService: ProcessusService, private messageService: MessageService,private produitService: ProduitService,
              private confirmationService: ConfirmationService, private formBuilder: FormBuilder) {}

  ngOnInit() {
   
      this.submitted=false
      this.processus={}


      console.log(this.processus)


      this.processusSubject.subscribe(
          (data)=>
          {
              this.haveAllprocessus()
              this.haveAllProduit()
              this.haveAllProduitByProcessus(this.processus)
      
          }
      )

      this.haveAllprocessus()
      this.haveAllProduit()
      this.haveAllProduitByProcessus(this.processus)
      //this.deleteProduit(this.prod,this.proc)
      
     


      
  }

  haveAllProduit()
  {
      this.produitService.getAllProduit().subscribe
      (
          {
              next: (data: Produit[]) => 
              
              {
                  this.produits=data
                  

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
            this.processusService.saveprocessus(data).subscribe
            ({
              next:(data)=>
              {
                  console.log("hum")
                  this.processusSubject.next()
               
              },
              error:(err)=>
              {
                  console.log(err)
              }
            })
            
          }
  
         
      
        
  
      }
  
      
  }


  onSubmit()
  {
    this.processus.code=this.code;
    this.processus.libelle=this.libelle;
    this.processus.codep=this.codep;
    console.log(this.processus)
      this.submitted=true
      
if (this.processus.libelle.trim()) {
    if(this.processus.id ==undefined)
      {
      this.processusService.saveprocessus(this.processus).subscribe
      (
          {
              next:(data)=>
              {
                  this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element inséré avec success', life:3000})
                  this.haveAllprocessus()
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
  modifierProcessus(processus){

    this.submitted=true
    if (this.processus.libelle.trim() && this.processus.code.trim() && this.processus.codep.trim()) {
      
   
        this.processusService.putprocessus(this.processus).subscribe
    (
        {
            next:(data)=>
            {
                this.messageService.add({severity:'success', summary:'Element inséré', detail:'Element modifié avec success', life:3000})
                this.haveAllprocessus()
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
    
    saveAllProcessusByProd(selectedProduit){
        this.submitted=true
        console.log(selectedProduit)
      
        for (let index = 0; index < selectedProduit.length; index++) {
            let element = selectedProduit[index];
            console.log(element)
            console.log(this.obj);
            this.obj={...this.obj}
           
            this.produitService.getProduit(element).subscribe((data)=>{
                this.donnee=data
              // console.log(this.donnee.id);
              
              //debugger
              this.produitList.push(this.donnee)
             
             console.log(this.produitList)
             console.log(this.processusSelec)

               
             this.processusService.saveProduitByIdProcessus(this.processusSelec,this.produitList).subscribe
             ({
                 next:(data:any[])=>
                 
                 {
                     this.produitByProcessus=data
                     //if(this.processusList==)
                     console.log(this.produitByProcessus);
                     this.messageService.add({severity: 'erreur', summary: 'inserertion ', detail: 'insertion avec succuss', life: 3000});
                     this.hideDialog()
                    
                 },
                 error:(error)=>
                 {
                     this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez recharger la page ou bien contacter le Service Informatique', life: 3000});
                     this.hideDialog()
                    
                    }
                 
             })
     
           
             this.produitList=[]
              
               
            })
          

               
        }
        this.selectedProduit=null
       
        
     }

    
    haveAllProduitByProcessus(processus){
        console.log(processus.id)
       
        this.processusService.getProduitById(processus.id).subscribe
        ({
            next:(data:Processus[])=>
            {
                this.produitByProcess=data
                console.log(this.produitByProcess)

            },
            error:(error)=>
            {
                this.messageService.add({severity: 'erreur', summary: 'Erreur de Connexion ', detail: 'Veuillez recharger la page ou bien contacter le Service Informatique', life: 3000});
            }
            
        })
    }
    
    deleteProduit(prod:Produit) {
        this.deleteProductDialog = true;
        this.produit = {...prod};
        console.log(prod)
        this.produitSup.push(prod)
       console.log(this.produitSup)
       for (let index = 0; index < this.produitSup.length; index++) {
        this.elements = this.produitSup[index];
        console.log(this.elements.dg_processus.id)
        console.log(this.elements.dg_produitAna.id)

        
       }
    
       console.log(this.elements.dg_processus.id)
       console.log(this.elements.dg_produitAna.id)
       
    }

    confirmDelete(){
    //     this.deleteProduit(this.produit,this.processus)
    //    console.log(this.produit,this.processus) 
        //   for (let index = 0; index < this.produitByProcess.length; index++) {
        //     this.elements = this.produitByProcess[index];
        //     console.log(this.elements)
        //     this.elements={...this.elements}
           
            
            this.deleteProductDialog = false;
            //this.produits = this.produits.filter(val => val.id !== this.produit); 
          //}
        
          console.log(this.elements.dg_processus.id)
          console.log(this.elements.dg_produitAna.id)
          this.processusService.deleteProduit(this.elements.dg_processus.id,this.elements.dg_produitAna.id).subscribe((data)=>{
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Produit Supprimé avec Success', life: 3000});
 
        })
     
      
       
        //this.produit = {};
    }
  

  openNew() {
      this.processus = {};
      this.submitted = false;
      this.processusDialog = true;
     
  }
  
  openNew2() {
    this.processus = {};
    this.submitted = false;
    this.editDialog = true;
   
}
openNew3(processus) {

    console.log(processus)
    this.obj=processus
    this.processusSelec= processus.id
        console.log(this.processusSelec)
   
    
   
    this.submitted = false;
  
  
   
  
    this.produitDialog=true;

 
}

  

  editprocessus(processus: Processus) {
      this.processus = {...processus};
      console.log(processus)
      this.editDialog = true;

  }

  

  hideDialog() {
      this.processusDialog = false;
      this.editDialog = false;
      this.submitted = false;
      this.produitDialog = false;
  }

 
}
