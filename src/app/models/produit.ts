import { TypeProduit } from "./typeProduit";

export interface Produit

{
    id? : number, 
    libelle? : string, 
    codeProduit ? : string,
    coefficient ? :number,
    dg_typeproduit?:TypeProduit;
}
