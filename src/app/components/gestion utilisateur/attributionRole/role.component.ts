import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
  templateUrl: './role.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RoleComponent implements OnInit {
    items: MenuItem[];
    ngOnInit() {


        this.items = [
            {label: 'Structures', routerLink: 'structures'},
            {label: 'Utilisateurs', routerLink: 'users'},
            {label: 'Roles', routerLink: 'roles'},
       //     {label: 'Confirmation', routerLink: 'confirmation'}
        ];

    }

}
