export class Produits {
    id: number;
    libelle: string;
    codeFournisseur: number;
    quantiteInitiale: number;
    quantiteRestante: number;
    dateLimite: string;
    dateAchat: string;
    prixAchat: number;

    constructor (libelle, codeFournisseur, quantiteInitiale, dateLimite, dateAchat, prixAchat){
        this.libelle=libelle;
        this.codeFournisseur=codeFournisseur;
        this.quantiteInitiale=quantiteInitiale;
        this.quantiteRestante=quantiteInitiale;
        this.dateLimite=dateLimite;
        this.dateAchat=dateAchat;
        this.prixAchat=prixAchat;
    }
    
    // constructor(
    //     id: number,
    //     libelle: string,
    //     codeFournisseur: number,
    //     quantiteInitiale: number,
    //     quantiteRestante: number,
    //     dateLimite: string,
    //     dateAchat: string,
    //     prixAchat: number,
    // ){}

    // public static fromJson(json: Object): Produits {
    //     return new Produits(
    //         json['id'],
    //         json['libelle'],
    //         json['codeFournisseur'],
    //         json['quantiteInitiale'],
    //         json['quantiteRestante'],
    //         json['dateLimite'],
    //         json['dateAchat'],
    //         json['prixAchat'],
    //     );
    // }
}
