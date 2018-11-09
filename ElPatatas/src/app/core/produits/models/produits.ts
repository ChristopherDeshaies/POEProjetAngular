export class Produits {

    /**
     * Identifiant du produit
     */
    id: number;

    /**
     * Nom du produit
     */
    libelle: string;

    /**
     * Code du fournisseur associé au produit
     */
    codeFournisseur: string;

    /**
     * Quantitée initiale du produit acheté  
     */
    quantiteInitiale: number;

    /**
     * Quantitée restante du produit acheté
     */
    quantiteRestante: number;

    /**
     * Date limite de consommation du produit
     */
    dateLimite: string;

    /**
     * Date d'achat du produit
     */
    dateAchat: string;

    /**
     * Prix d'achat du produit
     */
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
