export class ItemMenu {
    
    private id: number;
    private nom: string;
    private quantite: number;
    private prix: number;

    constructor(id: number, nom: string, quantite: number, prix : number) {
        this.id = id;
        this.nom= nom;
        this.quantite = quantite;
        this.prix = prix;
    }

    getNom(){
        return this.nom;
    }

    setNom(nom : string){
        this.nom = nom;
    }

    getQuantite(){
        return this.quantite;
    }

    setQuantite(quantite : number){
        this.quantite= quantite;
    }

    getPrix(){
        return this.prix;
    }

    setPrix(prix : number){
        this.prix= prix;
    }
}