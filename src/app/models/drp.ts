import { Structure } from "./structure";

export interface Drp {
    id?: number;
   libelle?: string; 
   adresse?: string; 
   email?: string; 
   telephone?: string;
   dg_structure?: Structure[];


}