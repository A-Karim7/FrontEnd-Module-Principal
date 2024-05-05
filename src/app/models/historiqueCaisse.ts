import { Caisse } from "./caisse";
import { Users } from "./users";

export interface HistoriqueCaisse
{
    id?: number; 
    dateattribution?: Date;
    datecloture ?: Date; 
    dg_user?: Users;
    dg_caisse?: Caisse;
}