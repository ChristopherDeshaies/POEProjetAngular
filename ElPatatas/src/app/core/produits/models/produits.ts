export class Produits {
    id: number;
    libelle: string;
    codeFournisseur: number;
    quantiteInitiale: number;
    quantiteRestant: number;
    dateLimite: string;

    dateAchat: string;
    prixAchat: number;

    constructor (libelle, codeFournisseur, quantiteInitiale, dateLimite, dateAchat, prixAchat){
        this.libelle=libelle;
        this.codeFournisseur=codeFournisseur;
        this.quantiteInitiale=quantiteInitiale;
        this.quantiteRestant=quantiteInitiale;
        this.dateLimite=dateLimite;
        this.dateAchat=dateAchat;
        this.prixAchat=prixAchat;
    }
}
