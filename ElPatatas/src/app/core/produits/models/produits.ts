export class Produits {
    id: number;
    libelle: string;
    codeFournisseur: string;
    quantiteInitiale: number;
    quantiteRestante: number;
    dateLimite: string;
    dateAchat: string;
    prixAchat: number;

    constructor (id, libelle, codeFournisseur, quantiteInitiale, quantiteRestante, dateLimite, dateAchat, prixAchat){
        this.id=id;
        this.libelle=libelle;
        this.codeFournisseur=codeFournisseur;
        this.quantiteInitiale=quantiteInitiale;
        this.quantiteRestante=quantiteRestante;
        this.dateLimite=dateLimite;
        this.dateAchat=dateAchat;
        this.prixAchat=prixAchat;
    }
}
