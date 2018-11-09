export class ProduitsEnVente {

    /**
     * Identifiant du ProduitsEnVente 
     */
    id: number;

    /**
     * Libelle du ProduitsEnVente
     */
    libelle: string;

    /**
     * La catégorie du ProduitsEnVente (Frite/Viande/Boisson)
     */
    categorie: string;

    /**
     * Prix de vente du produit
     */
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
