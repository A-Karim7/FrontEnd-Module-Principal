import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {

  constructor(
    private router: Router,
  ) { }

  private data;

  setData(data){
    this.data = data;
    console.log(data)
  }

  getData(){
    let temp = this.data;
    
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}