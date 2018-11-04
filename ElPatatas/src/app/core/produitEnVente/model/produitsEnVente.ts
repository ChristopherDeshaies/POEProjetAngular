export class ProduitsEnVente {
    id: number;
    libelle: string;
    categorie: string;
    prixvente: number;

    constructor (libelle, categorie, prixvente){
        this.libelle=libelle;
        this.categorie=categorie;
        this.prixvente=prixvente;
    }

    public static fromJson(json: Object): ProduitsEnVente {
        return new ProduitsEnVente(
            json['libelle'],
            json['categorie'],
            json['prixvente']
        );
    }
}
