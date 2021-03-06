import { ItemMenu } from "./itemmenu";

export class Commandes {
    
     id: number;
     dateCommande: Date;
     listProduits: any[];
     prixTotal: number;
    private userid: number;
    private usernom: string;
    private userprenom : string;

    constructor(
        id : number ,
        dateCommande: Date, 
        listProduits: ItemMenu[], 
        prixTotal: number, 
        userid: number, 
        usernom: string, 
        userprenom : string) 
        {
            this.id=id;
            this.dateCommande = dateCommande;
            this.listProduits = listProduits;
            this.prixTotal = prixTotal;
            this.userid = userid;
            this.usernom = usernom;
            this.userprenom = userprenom;
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

    getUserId() {
        return this.userid;
    }

    setUserId(userid: number) {
        this.userid = userid;
    }

    getUsernom() {
        return this.usernom;
    }

    setUsernom(usernom: string) {
        this.usernom = usernom;
    }

    getUserprenom() {
        return this.usernom;
    }

    setUserprenom(userprenom: string) {
        this.userprenom = userprenom;
    }



    
}
