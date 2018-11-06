import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitsService } from 'src/app/core/produits/services/produits.service';
import { Produits } from 'src/app/core/produits/models/produits';
import { ProduitsEnVenteService } from 'src/app/core/produitEnVente/services/produitsEnVente';
import { ProduitsEnVente } from 'src/app/core/produitEnVente/model/produitsEnVente';
import { map } from 'rxjs/operators';

/**
 * @author Christopher Deshaies
 */
@Component({
  selector: 'app-gestionstocks',
  templateUrl: './gestionstocks.component.html',
  styleUrls: ['./gestionstocks.component.css']
})
export class GestionstocksComponent implements OnInit {

  /**
   * Contient la liste des produits et la liste des noms de produits en vente ou déjà vendu
   */
  listProduits: Observable<Produits[]>;
  listProduitsEnVente: Observable<ProduitsEnVente[]>;

  /**
   * Différence entre un produit connu et un produit nouveau
   */
  private newNomProduit: string;
  private categorieProduit: string;
  private prixVenteProduit: number;
  /**
   * Données par défaut dans un produit
   */
  private codeFournisseur: string[];
  private quantiteAjoutProduit: number[];
  private dateLimiteProduit: Date[];
  private dateAchatProduit:Date[];
  private prixAchatProduit:number[];

  /**
   * Tableau de boolean qui indique si les données de la catégorie sont dépliés
   */
  private hiddenCategorie: boolean[];

  /**
   * Tableau de boolean pour indiquer si une donnée doit être modifié
   */
  private tabModifierProduit: boolean[];

  /**
   * Map de quantitée restante des produits
   * K : Libelle du produit
   * V : SUM des quantitées restantes de produit
   */
  private mapQuantiteRestante:Map<String,number> = new Map<String,number>();
  
  /**
   * Tableau qui va contenir les modifications à effectuer sur le produit
   */
  private modifProduit: any[];

  /**
   * Constructeur de gestionstocks
   * @param produitsservice : appel du service Produits
   * @param produitenventeservice : appel du service ProduitsEnVente
   */
  constructor(private produitsservice: ProduitsService, private produitenventeservice: ProduitsEnVenteService) {
    this.hiddenCategorie = new Array<boolean>(); 
    this.mapQuantiteRestante = new Map<String,number>();
    this.tabModifierProduit = new Array<boolean>();
    this.modifProduit = new Array<any>();

    this.codeFournisseur = new Array<string>();
    this.quantiteAjoutProduit = new Array<number>();
    this.dateLimiteProduit = new Array<Date>();
    this.dateAchatProduit = new Array<Date>();
    this.prixAchatProduit = new Array<number>();
  }

  /**
   * On initialise la liste de produit et l'affichage du component
   */
  ngOnInit() {
    this.refresh();
    this.initHiddenCategorie();
    this.initModifierProduits();
    for(let i = 0; i<6; i++)
      this.modifProduit.push(0);
  }

  /**
   * Fonction qui retoune un Observable<Produits[]> des produits en base de donnée
   */
  getListProduits(): Observable<Produits[]> {
    return this.produitsservice.getListProduits().pipe(
      map(
        (produits: Produits[]) => {
          let lproduits: Produits[];
          lproduits = produits.filter(
            (produit:Produits) => new Date(produit.dateLimite) >= new Date()
          );
          return lproduits;
        }
      )
    );
  }

  /**
   * Fonction qui retoune un Observable<ProduitsEnProduit[]> des produits en vente ou déjà vendu en base de donnée
   */
  getListProduitsEnVente(): Observable<ProduitsEnVente[]>{
    return this.produitenventeservice.getProduitEnVente().pipe(
      map(
        (produitsEnVente: ProduitsEnVente[]) => {
        let lproduitsEnVente : ProduitsEnVente[];
        lproduitsEnVente = produitsEnVente.filter(
          (produitEnV:ProduitsEnVente) => produitEnV.categorie !== 'frite'
        );
        lproduitsEnVente.push( new ProduitsEnVente(0,'Frite','frite',1));
        return lproduitsEnVente;
      })
    );
     
  }

  /**
   * Fonction qui supprime un element en base en fonction de idProduit
   * @param idProduit : Identifiant du Produit
   */
  supprimerProduit(idProduit): void {
    new Promise((resolve,reject) => {
      if(confirm("Voulez vous vraiment supprimer ce produit du stock ?")){
        this.produitsservice.deleteProduit(idProduit).subscribe(resolve,reject);
      }
    }).then(
      () =>  this.refresh()
    );
  }

  /**
   * Fonction qui supprime un element dans la table ProduitEnVente en fonction de idProduitEnVente
   * @param idProduitEnVente : Identifiant du Produit en vente
   */
  supprimerProduitEnVente(idProduitEnVente): void{
    new Promise((resolve,reject) => {
      if(confirm("Voulez vous vraiment supprimer ce produit du stock ?")){
        this.produitenventeservice.deleteProduitEnVente(idProduitEnVente).subscribe(resolve,reject);
      }
    }).then(
      () =>  this.refresh()
    );
  }

  /**
   * Fonction qui ajoute un produit qui existe en stock
   * - utilisation de Promise avant d'effectuer un refresh
   * @param indiceCategorie L'index de la catégorie
   * @param libelle Le nom du produit
   */
  ajouterProduitStock(indiceCategorie: number, libelle: String): void{
    
    // Ajout
    new Promise(
      (resolve,reject) => {
      if(
        libelle &&
        this.codeFournisseur[indiceCategorie] && 
        this.quantiteAjoutProduit[indiceCategorie] && 
        this.quantiteAjoutProduit[indiceCategorie] && 
        this.dateLimiteProduit[indiceCategorie] &&
        this.dateAchatProduit[indiceCategorie] &&
        this.prixAchatProduit[indiceCategorie]
      ){
        this.produitsservice.postProduit(
          new Produits(
            0,
            libelle, 
            this.codeFournisseur[indiceCategorie],
            this.quantiteAjoutProduit[indiceCategorie],
            this.quantiteAjoutProduit[indiceCategorie],
            this.dateLimiteProduit[indiceCategorie],
            this.dateAchatProduit[indiceCategorie],
            this.prixAchatProduit[indiceCategorie]
          ) 
        ).subscribe(resolve,reject);
      }else{
        alert("Tous les champs ne sont pas rempli ...");
      }
    }
    ).then(
      // Refresh
      () => {
        this.refresh();
        this.codeFournisseur[indiceCategorie]=null;
        this.quantiteAjoutProduit[indiceCategorie]=null;
        this.quantiteAjoutProduit[indiceCategorie]=null;
        this.dateLimiteProduit[indiceCategorie]=null;
        this.dateAchatProduit[indiceCategorie]=null;
        this.prixAchatProduit[indiceCategorie]=null;
      }
    );
    
  }

  /**
   * Fonction qui ajoute un nouveau produit en stock
   */
  ajouterNouveauProduitStock(): void{

    this.produitenventeservice.findProduitEnVente(this.newNomProduit).then( 
      (produitFind) => {
        if(!produitFind && 
          this.newNomProduit &&
          this.categorieProduit &&
          this.prixVenteProduit &&
          this.codeFournisseur[0] && 
          this.quantiteAjoutProduit[0] && 
          this.quantiteAjoutProduit[0] && 
          this.dateLimiteProduit[0] &&
          this.dateAchatProduit[0] &&
          this.prixAchatProduit[0]){
          this.produitenventeservice.ajouterProduitEnVente(
            new ProduitsEnVente(
            0,
            this.newNomProduit,
            this.categorieProduit,
            this.prixVenteProduit)
          );
        }
      } 
    );

    // Ajout
    new Promise(
      (resolve,reject) => {
        if(
          this.newNomProduit &&
          this.categorieProduit &&
          this.prixVenteProduit &&
          this.codeFournisseur[0] && 
          this.quantiteAjoutProduit[0] && 
          this.quantiteAjoutProduit[0] && 
          this.dateLimiteProduit[0] &&
          this.dateAchatProduit[0] &&
          this.prixAchatProduit[0]
        ){
          this.produitsservice.postProduit(
            new Produits(
              0,
              this.newNomProduit, 
              this.codeFournisseur[0],
              this.quantiteAjoutProduit[0],
              this.quantiteAjoutProduit[0],
              this.dateLimiteProduit[0],
              this.dateAchatProduit[0],
              this.prixAchatProduit[0]
            ) 
          ).subscribe(resolve,reject);
        }else{
          alert("Tous les champs ne sont pas rempli ...");
        }
      }
    ).then(
      // Refresh
      () => {
        this.refresh();
        this.codeFournisseur[0]=null;
        this.quantiteAjoutProduit[0]=null;
        this.quantiteAjoutProduit[0]=null;
        this.dateLimiteProduit[0]=null;
        this.dateAchatProduit[0]=null;
        this.prixAchatProduit[0]=null;
        this.newNomProduit=null;
      }
    );
  }

  /**
   * Fonction qui modifie un produits en stock
   * @param id L'identifiant du produit
   * @param libelle Le nom du produit
   */
  modifierProduit(id,libelle): void{
    new Promise(
      (resolve,reject) => {
        this.produitsservice.putProduit(
          new Produits(
            id,
            libelle,
            this.modifProduit[0],
            this.modifProduit[1],
            this.modifProduit[2],
            this.modifProduit[3],
            this.modifProduit[4],
            this.modifProduit[5]
          )
        ).subscribe(resolve,reject);
      }
    ).then(
      // Refresh
      () => this.refresh()
    );

  }

  /**
   * Fonction qui permet de déployer ou cacher les détails d'un produit
   * @param i : Numéro de la catégorie produit à replier ou déplier
   */
  changeHiddenCategorie(i): void{
    if(i!==0){
      this.hiddenCategorie[0]=true;
      this.newNomProduit=null;
      this.codeFournisseur[0]=null;
      this.quantiteAjoutProduit[0]=null;
      this.quantiteAjoutProduit[0]=null;
      this.dateLimiteProduit[0]=null;
      this.dateAchatProduit[0]=null;
      this.prixAchatProduit[0]=null;
    }
    if(this.hiddenCategorie[i])
      this.hiddenCategorie[i]=false;
    else
      this.hiddenCategorie[i]=true;
  }

  /**
   * Fonction qui permet d'accéder à la modification d'un produit
   * @param produit 
   */
  changerModifierProduit(produit: Produits): void{
    for(let i=0; i<this.tabModifierProduit.length; i++){
      if(i!==produit.id){
        this.tabModifierProduit[i]=false;
      }
    }
      
    if(this.tabModifierProduit[produit.id])
      this.tabModifierProduit[produit.id]=false;
    else{
      this.tabModifierProduit[produit.id]=true;
      this.modifProduit[0]=produit.codeFournisseur;
      this.modifProduit[1]=produit.quantiteInitiale;
      this.modifProduit[2]=produit.quantiteRestante;
      this.modifProduit[3]=produit.dateLimite;
      this.modifProduit[4]=produit.dateAchat;
      this.modifProduit[5]=produit.prixAchat;
    }
    
    
  }

  /**
   * Initialise toutes les catégories pour que les détails soient cachés
   */
  initHiddenCategorie(): void{
    this.listProduits.forEach(
      (produits:Produits[]) => {
        //Onglet ajouter un nouveau produit
        this.hiddenCategorie.push(true); 
        produits.forEach(
          () => {
            this.hiddenCategorie.push(true)
          }
        );
      }
    );
  }

  /**
   * Initialise la liste modifierProduit à false pour chaques données
   */
  initModifierProduits(): void{
    this.listProduits.forEach(
      (produits:Produits[]) => { 
        produits.forEach(
          () => {
            this.tabModifierProduit.push(false)
          }
        )
      }
    );
  }

  /**
   * Initialise la map mapQuantiteRestante avec en clé les libelles des produits et en value la somme des quantités restantes pour le produit
   */
  generateCompteurCategorie(): void{
    
    //Init de la map à 0 pour chaques produits
    this.produitenventeservice.getProduitEnVente().forEach(
      (produitsEnVente:ProduitsEnVente[]) => {
        produitsEnVente.forEach(
          (produitEnVente:ProduitsEnVente) => {
            //On ne prends pas dans produit en vente les libelles Petite / Moyenne et Grande
            if(produitEnVente.libelle!=='Moyenne' && produitEnVente.libelle!=='Petite' && produitEnVente.libelle!=='Grande')
            this.mapQuantiteRestante.set(
              produitEnVente.libelle,
              0
            );
          }
        );
        //On ajoute le libelle Frite
        this.mapQuantiteRestante.set(
          'Frite',
          0
        );
      }
    );

    this.produitsservice.getListProduits().forEach(
      (produits:Produits[]) => {
        produits.forEach(
          (produit:Produits) => {
            if(this.mapQuantiteRestante.get(produit.libelle)===undefined && new Date(produit.dateLimite) >= new Date()){
              this.mapQuantiteRestante.set(
                produit.libelle,
                produit.quantiteRestante
              );
            }else{
              if(new Date(produit.dateLimite) >= new Date()){
                this.mapQuantiteRestante.set(
                  produit.libelle, 
                  produit.quantiteRestante + this.mapQuantiteRestante.get(produit.libelle)
                );
              }
            }
          }
        )
      }
    );

    


  }

  /**
   * Retourne la quantitée restante du produit en libelle
   * @param libelle : key de la map pour récupéré la quantitée de produit restante
   */
  getQuantiteRestant(libelle): number{
    return this.mapQuantiteRestante.get(libelle);
  }

  /**
   * Fonction pour rafraichir l'affichage
   */
  refresh(): void{
    this.listProduits=this.getListProduits();
    this.listProduitsEnVente=this.getListProduitsEnVente();
    this.generateCompteurCategorie();
  
    for(let i = 0; i < this.tabModifierProduit.length; i++)
      this.tabModifierProduit[i]=false;
  }

}
