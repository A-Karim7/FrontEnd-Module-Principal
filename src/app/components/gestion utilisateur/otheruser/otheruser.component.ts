import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.scss']
})
export class OtheruserComponent implements OnInit {
  items: MenuItem[];
  ngOnInit() {
      this.items = [
          {label: 'Drp', routerLink: 'Drp'},
          {label: 'Structures', routerLink: 'structures'},
          {label: 'Utilisateurs', routerLink: 'users'},
      ];

  }

}
