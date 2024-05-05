import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Product } from 'src/app/api/product';
import { Drp } from 'src/app/models/drp';
import { Structure } from 'src/app/models/structure';
import { TypeStructure } from 'src/app/models/typeStructure';
import { ProductService } from 'src/app/service/productservice';
import { environment } from 'src/environments/environment.prod';
import { DrpService } from '../services/drp.services';
import { StructureService } from '../services/structure.services';
import { TypeStructureService } from '../services/typeStructure.services';

@Component({
  selector: 'app-structures',
  templateUrl: './structures.component.html',
  styleUrls: ['./structures.component.scss']
})
export class StructuresComponent implements OnInit {

    loading:boolean = false


  productDialog: boolean;

  typeStructure :any


  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[];



  product: Product;

  selectedProducts: Product[];


  // Structure


  structureDialog: boolean;


  deleteStructureDialog: boolean = false;

  deleteStructuresDialog: boolean = false;

  structures: Structure[];

  structure: Structure;

  selectedStructurres: Structure[];

  listTypeStructures : TypeStructure[]
  listDrps: Drp[]

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  structureSubject= new Subject<void>()

  selectedDrp : Drp

  tempStructures : Structure[]

  selectedStructure

  tempTypeStruct: any

  typeDialog = false

  lastcode

  listRoles
typeStructSubject= new Subject<void>()

  constructor(private productService: ProductService, private messageService: MessageService,
              private confirmationService: ConfirmationService,
               private structureservice: StructureService, private typeStructureService: TypeStructureService,
               private drpservice: DrpService, private http: HttpClient, private keycloakservice: KeycloakService) {}

ngOnInit() {

    this.lastcode=null

    this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles
/*
this.http.delete(environment.apiUrl+'dg_Structure/5').subscribe
(
    (data)=>
    {
        console.log(data)
    }
)
*/

    this.selectedStructure=[    ]

    this.typeStructure={}
      this.productService.getProducts().then(data => this.products = data);

      this.cols = [
          {field: 'name', header: 'Name'},
          {field: 'price', header: 'Price'},
          {field: 'category', header: 'Category'},
          {field: 'rating', header: 'Reviews'},
          {field: 'inventoryStatus', header: 'Status'}
      ];

      this.statuses = [
          {label: 'INSTOCK', value: 'instock'},
          {label: 'LOWSTOCK', value: 'lowstock'},
          {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];


      // NEW



this.structureSubject.subscribe
(
  (data)=>
  {
      this.haveAllStructure();
  }

)

this.typeStructSubject.subscribe
(
    (data)=>
    {
        this.haveAllTypeStructure();
    }
)

this.haveAllStructure();
this.haveAllTypeStructure();
this.haveAllDrp()

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

  haveAllStructure()
  {
    this.loading = true

      this.structureservice.getAllStructure().subscribe (

          (data:Structure[])=>
          {
              this.structures=data
              console.log(this.structures)
              this.tempStructures=data
              this.loading = false
          }
          )

  }



  haveAllDrp()
  {

    let structlist

this.drpservice.getAllDrp().subscribe(
    {
        next: (v1:Drp[]) =>
           {
               structlist=v1
               console.log(this.listDrps)


          }
     ,
       // error: (e) => this.messageService.add({severity:'error', summary:'Error Drp', detail:'erreur drp'}),
        complete: () => this.structureservice.getAllStructure().subscribe (
            ({
                next: (v) => console.log(structlist),
                error: (e) => this.messageService.add({severity:'error', summary:'Error Structure', detail:'erreur structure'}),
                complete: () => console.log('done')
            })
        ),
    }
)





      this.drpservice.getAllDrp().subscribe (

          (data:Drp[])=>
          {
              this.listDrps=data
              console.log(this.listDrps)
          }
          )

  }




  haveAllTypeStructure()
  {
      this.typeStructureService.getAllTypeStructure().subscribe(
          (data)=>
          {
            this.listTypeStructures=data

            console.log(this.listTypeStructures)
          }
        )
  }

saveTypeStructure()
{

    this.typeStructureService.saveTypeStructure(this.typeStructure).subscribe(
        (data)=>
        {
            this.messageService.add({severity:'success', summary:'Success', detail:'Type Structure modifié'})

            this.typeStructSubject.next()
        })

        this.typeStructure={}
}


  editTypeStruct(typeStructure)
  {
      console.log("ho")
    this.typeStructure=typeStructure

    this.typeStructureService.putTypeStructure(this.typeStructure).subscribe(
        (data)=>
        {

          this.messageService.add({severity:'success', summary:'Success', detail:'Type Structure modifié'})

          this.typeStructSubject.next()
        })

        this.typeStructure=false

  }


  deleTypeStruct(typeStructure)
  {


  }
  selectDrp()
  {
      this.structures=this.tempStructures

      console.log(this.selectedDrp)

      this.structures=this.structures.filter(structure=>structure.dg_drp.id == this.selectedDrp.id);



  }

opentypeDialog()
{
    this.typeDialog=true
}


  showAnnexes(structure)
  {

    this.selectedStructure=structure.dg_structureBureau

    console.log(this.selectedStructure)
  }


  openNew() {
      this.product = {};

     // new
      this.structure= { };
      this.submitted = false;
      this.productDialog = true;
      this.structureDialog=true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(structure) {
 // OLD       this.product = {...product};

 this.lastcode=null

      this.structureDialog=true;
      this.structure= {...structure}
      console.log(this.structure)
      this.lastcode=this.structure.code
  }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = {...product};
  }

  confirmDeleteSelected(){
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      this.selectedProducts = null;
  }

  confirmDelete(){
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      this.product = {};
  }

  hideDialog() {
      this.productDialog = false;
      this.typeDialog=false;
      this.structureDialog=false
      this.submitted = false;


  }



cancel(typeStruct)
{
    console.log("cancel")

    console.log(this.tempTypeStruct)

    for(let type of this.listTypeStructures)
    {
        if(type.id==typeStruct.id)
        {
            type= this.tempTypeStruct

            console.log(this.tempTypeStruct)
            console.log(type)
        }

    }

}



initTypeStruct(typeStruct)
{

    console.log("init")
    this.tempTypeStruct=typeStruct
    console.log(this.tempTypeStruct)
}

  saveProduct() {
      this.submitted = true;

console.log(this.structure)

let testcodepostal= /[0-9]{5}/
        let testcode= /[0-9]{5}/
        let testtelephone= /[0-9]{9}/

        if(this.structures.find(struct=> struct.code==this.structure.code)!=undefined && this.lastcode!=this.structure.code ||
        this.structures.find(struct=> struct.code==this.structure.code)!=undefined && this.lastcode==null
        )
        {

            console.log("hhqhs")

            if(this.lastcode!=null && this.lastcode!=this.structure.code)
            {

            this.messageService.add({ severity: 'error', summary:'Erreur', detail :'Code Bureau déja utilisé'   });
            }
            if(this.lastcode ==null)
            {
                this.messageService.add({ severity: 'error', summary:'Erreur', detail :'Code Bureau déja utilisé'   });
            }
        }

        else(this.structures.find(struct=> struct.code==this.structure.code)==undefined || this.lastcode==this.structure.code)
        {


        if(this.structure.adresse.trim() && this.structure.libelle.trim() && this.structure.code.trim() && this.structure.dg_drp.libelle.trim()
        && this.structure.dg_typeStructure.libelle.trim()

        && testcodepostal.test(this.structure.codepostal) && testcode.test(this.structure.code) && testcode.test(this.structure.telephone)
        )

        {

        console.log("MAIS")

if(this.structure.id)
{
  this.structureservice.putStructure(this.structure).subscribe
  (
      (data)=>
      {
          console.log("fait")
          this.structureSubject.next()

      },

      (error)=>
      {
          console.log(error)
      }
  )
}
else
{



this.structureservice.saveStructure(this.structure).subscribe
(
  (data)=>
  {
      console.log("done")
      this.structureSubject.next()

      this.messageService.add({ severity: 'success', summary: 'Structure Enregistré', detail: 'Vous avez bien Enregistré votre Structure' });

  },

  (error)=>
  {
      this.messageService.add({ severity: 'error', summary:'Erreur', detail :'Structure non enregistré:  ' + error.message });
  }
)
}

this.structureDialog=false
}
}





/* OLD

      if (this.product.name.trim()) {
          if (this.product.id) {
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          } else {
              this.product.id = this.createId();
              this.product.code = this.createId();
              this.product.image = 'product-placeholder.svg';
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.products.push(this.product);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
      */
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
}
