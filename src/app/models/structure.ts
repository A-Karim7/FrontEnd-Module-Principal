import { Drp } from "./drp";
import { StructureAnnexe } from "./structureAnnexe";
import { TypeStructure } from "./typeStructure";

export interface Structure {
    id?: number;
   libelle?: string;
   adresse?: string;
   email?: string;
   telephone?: string;
   code ?: string;
   codepostal ?: string;
   codeips ?: string;
   dateCreation ?: Date;
   dg_drp ?: Drp;
   dg_typeStructure?: TypeStructure ;
   dg_structureAnnexe ?: StructureAnnexe[];
   dg_structureBureau ?: StructureAnnexe[];





}
