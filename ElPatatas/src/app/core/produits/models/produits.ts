export class Produits {
    id: number;
    libelle: string;
    codeFournisseur: number;
    quantiteInitiale: number;
    quantiteRestante: number;
    dateLimite: string;
    dateAchat: string;
    prixAchat: number;

    constructor(
        id: number,
        libelle: string,
        codeFournisseur: number,
        quantiteInitiale: number,
        quantiteRestante: number,
        dateLimite: string,
        dateAchat: string,
        prixAchat: number,
    ){}

    public static fromJson(json: Object): Produits {
        return new Produits(
            json['id'],
            json['libelle'],
            json['codeFournisseur'],
            json['quantiteInitiale'],
            json['quantiteRestante'],
            json['dateLimite'],
            json['dateAchat'],
            json['prixAchat'],
        );
    }
}
