export class ProduitsEnVente {
    id: number;
    libelle: string;
    categorie: string;
    prixvente: number;

    constructor (id, libelle, categorie, prixvente){
        this.id=id;
        this.libelle=libelle;
        this.categorie=categorie;
        this.prixvente=prixvente;
    }

    public static fromJson(json: Object): ProduitsEnVente {
        return new ProduitsEnVente(
            json['id'],
            json['libelle'],
            json['categorie'],
            json['prixvente']
        );
    }
}
