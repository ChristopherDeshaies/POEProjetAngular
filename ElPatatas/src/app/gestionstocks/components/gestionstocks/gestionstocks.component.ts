import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitsService } from 'src/app/core/produits/services/produits.service';
import { Produits } from 'src/app/core/produits/models/produits';
import { map } from 'rxjs/operators';
import { delay, reject } from 'q';
import { ProduitsEnVenteService } from 'src/app/core/produitEnVente/services/produitsEnVente';
import { ProduitsEnVente } from 'src/app/core/produitEnVente/model/produitsEnVente';
import { forEach } from '@angular/router/src/utils/collection';

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
  private listProduits: Observable<Produits[]>;
  private listProduitsEnVente: Observable<ProduitsEnVente[]>;

  /**
   * Différence entre un produit connu et un produit nouveau
   */
  private produitSelected: string;
  private newNomProduit: string;

  /**
   * Données par défaut dans un produit
   */
  private codeFournisseur: string;
  private quantiteAjoutProduit: number;
  private dateLimiteProduit: Date;
  private dateAchatProduit:Date;
  private prixAchatProduit:number;

  /**
   * Tableau de boolean qui indique si les données de la catégorie sont dépliés
   */
  private hiddenCategorie: boolean[];

  /**
   * Map de quantitée restante des produits
   * K : Libelle du produit
   * V : SUM des quantitées restantes de produit
   */
  private mapQuantiteRestante:Map<String,number>;
  
  /**
   * Constructeur de gestionstocks
   * @param produitsservice : appel du service Produits et du ProduitEnVente
   */
  constructor(private produitsservice: ProduitsService, private produitenventeservice: ProduitsEnVenteService) {
    this.hiddenCategorie = new Array<boolean>(); 
    this.mapQuantiteRestante = new Map<String,number>();
    
  }

  /**
   * On initialise la liste de produit et l'affichage du component
   */
  ngOnInit() {
    this.refresh();
    this.initHiddenCategorie();
  }

  /**
   * Fonction qui retoune un Observable<Produits[]> des produits en base de donnée
   */
  getListProduits(): Observable<Produits[]> {
    return this.produitsservice.getListProduits();
  }

  /**
   * Fonction qui retoune un Observable<ProduitsEnProduit[]> des produits en vente ou déjà vendu en base de donnée
   */
  getListProduitsEnVente(): Observable<ProduitsEnVente[]>{
    return this.produitenventeservice.getProduitEnVente();
  }

  /**
   * Fonction qui supprime un element en base en fonction de idProduit - utilisation de Promise avant d'effectuer un refresh
   * @param idProduit : Identifiant du Produit
   */
  supprimerProduit(idProduit): void {
    new Promise((resolve,reject) => {
      this.produitsservice.deleteProduit(idProduit).subscribe(resolve,reject);
    }).then(
      () =>  this.refresh()
    );
  }

  /**
   * Fonction qui supprime un element dans la table ProduitEnVente en fonction de idProduitEnVente - utilisation de Promise avant d'effectuer un refresh
   * @param idProduitEnVente : Identifiant du Produit en vente
   */
  supprimerProduitEnVente(idProduitEnVente): void{
    new Promise((resolve,reject) => {
     this.produitenventeservice.deleteProduitEnVente(idProduitEnVente).subscribe(resolve,reject);
    }).then(
      () =>  this.refresh()
    );
  }
  /**
   * Fonction qui ajoute un produit - Le produit peut avoir son libelle déjà renseigné en base ou être nouveau
   * - utilisation de Primise avant d'effectuer un refresh
   */
  ajouterProduitStock(): void{
    let produitNom:String;

    // Verification si nouveau produit ou pas
    if(this.produitSelected){
      produitNom=this.produitSelected
    }else{
      produitNom=this.newNomProduit;
      this.produitenventeservice.findProduitEnVente(produitNom).then( 
        (produitFind) => {
          if(!produitFind){
            this.produitenventeservice.ajouterProduitEnVente(produitNom);
          }
        } 
      ); 
    }
    
    // Ajout
    new Promise(
      (resolve,reject) => {

      this.produitsservice.postProduit(
        new Produits(
          produitNom, 
          this.codeFournisseur,
          this.quantiteAjoutProduit,
          this.dateLimiteProduit,
          this.dateAchatProduit,
          this.prixAchatProduit
        )
      ).subscribe(resolve,reject);
      
    }
    ).then(
      // Refresh
      () => this.refresh()
    );
    
  }

  /**
   * Effectue le changement de hiddenCategorie en fonction de la catégorie numéro 'i'
   * @param i : Numéro de la catégorie produit à replier ou déplier
   */
  changeHiddenCategorie(i): void{
    if(this.hiddenCategorie[i])
      this.hiddenCategorie[i]=false;
    else
      this.hiddenCategorie[i]=true;
  }

  /**
   * Initialise toutes les catégories pour que les détails soient cachés
   */
  initHiddenCategorie(): void{
    this.listProduits.forEach(
      (produits:Produits[]) => { 
        produits.forEach(
          () => {
            this.hiddenCategorie.push(true)
          }
        )
      }
    );
  }

  /**
   * Initialise la map mapQuantiteRestante avec en clé les libelles des produits et en value la somme des quantités restantes pour le produit
   */
  generateCompteurCategorie(): void{
    this.mapQuantiteRestante = new Map<String,number>();

    let listproduit:Observable<Produits[]> = this.produitsservice.getListProduits();
    let listproduitsenvente:Observable<ProduitsEnVente[]> = this.produitenventeservice.getProduitEnVente();
    
    //Init de la map à 0 pour chaques produits
    listproduitsenvente.forEach(
      (produitsEnVente:ProduitsEnVente[]) => {
        produitsEnVente.forEach(
          (produitEnVente:ProduitsEnVente) => {
            this.mapQuantiteRestante.set(
              produitEnVente.libelle,
              0
            );
          }
        );
      }
    );

    listproduit.forEach(
      (produits:Produits[]) => {
        produits.forEach(
          (produit:Produits) => {
            if(this.mapQuantiteRestante.get(produit.libelle)===undefined){
              this.mapQuantiteRestante.set(
                produit.libelle,
                produit.quantiteRestante
              );
            }else{
              this.mapQuantiteRestante.set(
                produit.libelle, 
                produit.quantiteRestante + this.mapQuantiteRestante.get(produit.libelle)
              );
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
  }

}
