import { Component, OnInit } from '@angular/core';
import {Product} from "../../../api/product";
import {Structure} from "../../../models/structure";
import {TypeStructure} from "../../../models/typeStructure";
import {Drp} from "../../../models/drp";
import {ProductService} from "../../../service/productservice";
import {ConfirmationService, MessageService} from "primeng/api";
import {StructureService} from "../services/structure.services";
import {TypeStructureService} from "../services/typeStructure.services";
import {DrpService} from "../services/drp.services";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TransfertService } from '../bureauTransfert.service';


@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.scss']
})
export class BureauComponent implements OnInit {
    loading:boolean = false

    productDialog: boolean;



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


    typebureauId

    lastcode


    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private structureservice: StructureService, private typeStructureService: TypeStructureService,
                private drpservice: DrpService, private router: Router, private transfer: TransfertService) {}

    ngOnInit() {
this.lastcode=null
        console.log(this.lastcode)
        this.selectedStructure=[    ]
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

        this.haveAllStructure();
        this.haveAllTypeStructure();
        this.haveAllDrp()

    }

    haveAllStructure()
    {
        this.loading = true
        this.structureservice.getAllStructure().subscribe (

            (data:any[])=>
            {

                console.log(data)
                this.structures =data.filter(structure=>structure.dg_typeStructure?.id==1)
                console.log(this.structures)
                this.tempStructures=data.filter(structure => structure.dg_typeStructure?.id==1)
                this.loading = false
            }
        )

    }



    haveAllDrp()
    {
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

                this.typebureauId=this.listTypeStructures.find(typestruct=>typestruct.libelle.toLowerCase().includes("bureau"))

                console.log(this.listTypeStructures)
            }
        )
    }


    selectDrp()
    {
        this.structures=this.tempStructures

        console.log(this.selectedDrp)

        this.structures=this.structures.filter(structure=>structure.dg_drp.id == this.selectedDrp.id);



    }

    showAnnexes(structure)
    {

        this.selectedStructure=structure.dg_structureAnnexe
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

        this.submitted = false
        // OLD       this.product = {...product};
this.lastcode=null
        this.structureDialog=true;
        this.structure= {...structure}

        this.lastcode=this.structure.code
        console.log(this.structure)
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
        this.submitted = false;


    }

    gotoAffecterAnnexeComponent(structure)
    {
        console.log(structure)

        this.transfer.setData(structure);
        this.router.navigate(['/organisations/bureaux/affecterAnnexe'])


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
        
        && testcodepostal.test(this.structure.codepostal) && testcode.test(this.structure.code)
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


            this.structure.dg_typeStructure.id=this.typebureauId.id
            

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
