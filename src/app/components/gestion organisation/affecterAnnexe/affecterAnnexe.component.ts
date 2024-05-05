import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Structure } from 'src/app/models/structure';
import { StructureAnnexe } from 'src/app/models/structureAnnexe';
import { TransfertService } from '../bureauTransfert.service';
import { StructureAnnexeService } from '../services/annexe.service';
import { StructureService } from '../services/structure.services';

@Component({
  selector: 'app-affecterAnnexe',
  templateUrl: './affecterAnnexe.component.html',
  styleUrls: ['./affecterAnnexe.component.scss']
})
export class AffecterAnnexeComponent implements OnInit {

  structure
  isEmpty = false

  annexe:Structure

submitted=false

  ajoutDialog=false

  structureannexe:StructureAnnexe

  liststructures:any[]

  lastannexe:any

  structureSubject=new Subject<void>()

  constructor(private transfert: TransfertService, private router:Router, private structureservice:StructureService, private structureannexeservice: StructureAnnexeService) {

   }

listannexes


  ngOnInit() {

    console.log(this.annexe)


    if(this.transfert.getData()==undefined){

      this.router.navigate(['/organisations/bureaux'])
    }

    this.structure=this.transfert.getData()

    this.structureSubject.subscribe(
      ()=>{
        this.haveStructure()
      }
    )

this.haveStructure()









    console.log()
/*
    this.idBud=this.router.snapshot.params['idBud'];
    this.num=this.router.snapshot.params['num'];
    this.idLigne=this.router.snapshot.params['idLigne'];
    */
console.log(this.transfert.getData())

console.log(Object.keys(this.structure))

  }

  haveStructure()
  {
    this.structureservice.getStructure(this.structure.id).subscribe
    (
      (data)=>
      {
        this.structure=data
        this.listannexes=this.structure.dg_structureBureau
        if(this.listannexes.length==0){
          this.isEmpty=true
        }
      }
    )
  }


  hideDialog()
  {
    this.ajoutDialog=false
  }
  saveAnnexe(){

  console.log(this.annexe)

  this.submitted=true

  let testcodepostal= /[0-9]{5}/
        let testcode= /[0-9]{5}/ 
        let testtelephone= /[0-9]{9}/ 


        if(this.annexe.adresse.trim() && this.annexe.libelle.trim() && this.annexe.code.trim() 
        
        && testcodepostal.test(this.structure.codepostal) && testcode.test(this.structure.code)
        )     

  this.annexe.dg_typeStructure={id:2}

  this.annexe.dg_drp=this.structure.dg_drp

  this.annexe.dg_typeStructure.id=2

this.structureservice.saveStructure(this.annexe).subscribe(
  (data)=>{

  console.log(data)

  console.log("hehoo")


  this.lastannexe=data

  this.structureservice.getAllStructure().subscribe(
    (data2:any)=>{
      this.liststructures=data2

      console.log(this.liststructures)

      //this.lastannexe=this.liststructures[this.liststructures.length-1]

      console.log(this.liststructures)

      console.log(this.lastannexe)
      this.structureannexe.annexe={id:this.lastannexe.id}

      this.structureannexe.bureau={id:this.structure.id}


      this.structureannexeservice.saveStructureAnnexe(this.structureannexe).subscribe
      (
        (data)=>{
          console.log(data)

          this.structureSubject.next()

          this.isEmpty=false

        }
      )

    })
  })

    this.structureSubject.next()

    this.ajoutDialog=false

  }

  openDialog()
  {

    this.submitted=true
    this.ajoutDialog=true
    this.annexe={}
    this.structureannexe={}



  }



}
