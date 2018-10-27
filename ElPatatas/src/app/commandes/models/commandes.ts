export class Commandes {
    
    private id: number;
    private dateCommande: string;
    //private listProduits: Map<string, number>;
    private listProduits: string;
    private prixTotal: number;

    constructor(dateCommande: string, listProduits: string, prixTotal : number) {
        this.dateCommande= dateCommande;
        this.listProduits = listProduits;
        this.prixTotal = prixTotal;
    }

    getId(){
        return this.id;
    }

    getDateCommande(){
        return this.dateCommande;
    }

    setDateCommande(dateCommande : string){
        this.dateCommande = dateCommande;
    }

    getListProduits(){
        return this.listProduits;
    }

    setListProduits(listProduits : string){
        this.listProduits= listProduits;
    }

    getPrixTotal(){
        return this.prixTotal;
    }

    setPrixTotal(prixTotal : number){
        this.prixTotal= prixTotal;
    }
}
