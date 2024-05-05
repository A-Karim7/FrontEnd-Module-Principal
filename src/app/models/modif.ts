import { Structure } from "./structure";
import {Users} from "./users";

export interface Modif {
    id?: number;
    dateTransfert?: string;
    dg_user?: Users;
    dg_fonction_depart?: string;
    dg_fonction_arrivee?: string;
    dg_structureDep?: Structure;
    dg_structureArr?: Structure;
}
