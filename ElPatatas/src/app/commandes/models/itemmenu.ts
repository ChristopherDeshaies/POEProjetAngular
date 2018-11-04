export class ItemMenu {
    
    private id: number;
    private libelle : string;
   //private nom: string;
    private quantite: number;
    private prix: number;
    private quantiterestante: number;

    constructor(libelle: string, quantite: number, prix : number, quantiterestante: number) {
        //this.nom= nom;
        this.libelle = libelle;
        this.quantite = quantite;
        this.prix = prix;
        this.quantiterestante = quantiterestante;
    }

    // getNom(){
    //     return this.nom;
    // }

    // setNom(nom : string){
    //     this.nom = nom;
    // }

    getLibelle(){
        return this.libelle;
    }

    setLibelle(libelle : string){
        this.libelle = libelle;
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

    getQuantiterestante(){
        return this.quantiterestante;
    }

    setQuantiterestante(quantiterestante : number){
        this.quantiterestante= quantiterestante;
    }
}