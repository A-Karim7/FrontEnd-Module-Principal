import { Structure } from "./structure";
import { TypeStructure } from "./typeStructure";

export interface SousStructure {
    id: string;
    libelle: string;
    code:string;
    dg_typeStructure?: TypeStructure ;
    dg_Structure?: Structure;
}