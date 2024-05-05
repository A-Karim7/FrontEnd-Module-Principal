import { Structure } from "./structure";
import { TypeCaisse } from "./typecaisse"
import { Users } from "./users";

export interface Caisse
{
    id?: number; 
    libelle?: string;
    version?: number; 
    cheque?: number; 
    douane?: number; 
    cheque_rejete?: number; 
    ccp?: number; 
    taxe_frais?: number; 
    contentieux?: number;
    bonvert?: number; 
    numeraire?: number; 
    numeraire_veille?: number; 
    dg_user?:Users ; 
    dg_typeCaisse?:TypeCaisse;
    dg_structure?:Structure;  
   
}