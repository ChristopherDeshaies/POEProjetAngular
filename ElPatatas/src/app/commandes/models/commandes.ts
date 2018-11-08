import { ItemMenu } from "./itemmenu";

export class Commandes {
    
    public id: number;
    public dateCommande: Date;
    //private listProduits: Map<string, number>;
    //private listProduits: string;
    public listProduits: any[];
    public prixTotal: number;
  static dateCommande: Date;

    constructor(id,dateCommande: Date, listProduits: ItemMenu[], prixTotal: number) {
        this.id=id;
        this.dateCommande = dateCommande;
        this.listProduits = listProduits;
        this.prixTotal = prixTotal;
    }

    getId() {
        return this.id;
    }

    getDateCommande() {
        return this.dateCommande;
    }

    setDateCommande(dateCommande: Date) {
        this.dateCommande = dateCommande;
    }

    getListProduits() {
        return this.listProduits;
    }

    setListProduits(listProduits: any[]) {
        this.listProduits = listProduits;
    }

    getPrixTotal() {
        return this.prixTotal;
    }

    setPrixTotal(prixTotal: number) {
        this.prixTotal = prixTotal;
    }
}
