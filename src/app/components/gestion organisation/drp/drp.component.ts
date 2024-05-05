import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Product } from 'src/app/api/product';
import { Drp } from 'src/app/models/drp';
import { ProductService } from 'src/app/service/productservice';
import { DrpService } from '../services/drp.services';

@Component({
  selector: 'app-drp',
  templateUrl: './drp.component.html',
  styleUrls: ['./drp.component.scss']
})
export class DrpComponent implements OnInit {
  productDialog: boolean;



    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

  

    product: Product;

    selectedProducts: Product[];


    // Drp 


    drpDialog: boolean;

    deleteDrpDialog: boolean = false;

    deleteDrpsDialog: boolean = false;

    drps: Drp[];  

    drp: Drp;

    selectedDrps: Drp[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    drpSubject= new Subject<void>()

    listRoles
    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private drpservice: DrpService, private keycloakservice:KeycloakService) {}

 ngOnInit() {


    this.listRoles=this.keycloakservice.getKeycloakInstance().realmAccess.roles

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

       

this.drpSubject.subscribe
(
    (data)=>
    {
        this.haveAllDrp();
    }
    
)

this.haveAllDrp();

   
    }

    haveAllDrp()
    {
        this.drpservice.getAllDrp().subscribe (
        
            (data:Drp[])=>
            {
                this.drps=data
                console.log(this.drps)
            }
            )
        
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
   

    openNew() {
        this.product = {};

       // new
        this.drp= { };
        this.submitted = false;
        this.productDialog = true;
        this.drpDialog=true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(drp) {
   // OLD       this.product = {...product};
        this.productDialog = true;
        this.drpDialog=true;
        this.drp= {...drp}
        console.log(this.drp)
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
        this.drpDialog=false
        this.submitted = false;

        
    }

    saveProduct() {
        this.submitted = true;

console.log(this.drp)

console.log(this.drp)

if(this.drp.id)
{
    if(Object.keys(this.drp).length!==0 && this.drp.libelle && this.drp.adresse && this.drp.email )
    {
 
  delete this.drp.dg_structure

    this.drpservice.putDrp(this.drp).subscribe
    (
        (data)=>
        {
            console.log("fait")
            this.drpSubject.next()
            this.drpDialog=false

        },
        
        (error)=>
        {
            console.log(error)
        }
    )
   
    }
}
else
{
    console.log(Object.keys(this.drp).length)


    if(Object.keys(this.drp).length!=0 && this.drp.libelle && this.drp.adresse && this.drp.email )
    {

  

this.drpservice.saveDrp(this.drp).subscribe
(
    (data)=>
    {
        console.log("done")
        this.drpSubject.next()
        this.drpDialog=false

    }
)
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