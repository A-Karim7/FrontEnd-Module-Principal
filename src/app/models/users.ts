import {Directions} from "./directions";
import {Fonctions} from "./fonctions";
import {Roles} from "./roles";

export interface Users {
    id?: number;
    email?: string;
    nom?: string;
    password?: string;
    prenom?: string;
    reference?: string;
    telephone?: string;
    matricule?: string;
    dg_structure?: Directions;
    dg_fonction?: Fonctions;
    roles?: Roles[];
    dg_userRoles?: any;
    lib_structure?: string;
    fonction?: string;
    enable?:boolean;
}
