import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '../models/itemmenu';
import { Commandes } from '../models/commandes';
import { CommandesService } from '../services/commandes.service';
import { ProduitsService } from '../../core/produits/services/produits.service';
import { Produits } from '../../core/produits/models/produits';
import { map, finalize, filter, reduce  } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

/**
 * gestion des commandes prises par l'employé
 */
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  // selectedFritesIds = new Map();
  // selectedBoissonsIds = new Map();
  // selectedViandesIds = new Map();
  //produits : Produits[] = [];
  produits : Observable<Produits[]>;
  totalquantiteRestante : number = 0;

  /**
   * liste des produits frites à afficher sur la page commande
   */
  frites: ItemMenu[] ;

  /**
   * liste des boissons à afficher sur la page commande
   */
  boissons: ItemMenu[];

  /**
   * liste des viandes à afficher sur la page commande
   */
  viandes: ItemMenu[] ;

  /**
   * variable de la commande en cours
   */
  commande: Commandes;

  /**
   * liste des produits commandés par le client
   */
  listProduits: Map<string, number>;

  /**
   * liste des commandes prises par l'employées , à intégrer dans un composent liste des commandes
   */
  commandes: Array<Commandes>;

  /**
   * date de prise de la commande du client au format UTC
   */
  date: string;

  /* à implémenter plus tard */
  // prixFrites :number =0;
  // prixBoissons :number =0;
  // prixViandes :number =0;

  /**
   * Prix total de la commande
   */
  prixTotal: number = 0;

  constructor(
    private commandesService: CommandesService,
    private produitsService: ProduitsService
    ) {

  }

  ngOnInit() {

    this.frites = [];
    this.boissons = [];
    this.viandes = [];
    this.commandes = new Array<Commandes>();

    // this.selectedFritesIds
    // .set("Grande Frite", 0)
    // .set("Moyenne Frite", 0)
    // .set("Petite Frite", 0);

    // this.selectedBoissonsIds
    // .set("coca", 0)
    // .set("pepsi", 0)
    // .set("fanta", 0);

    // this.selectedViandesIds
    // .set("Steack", 0)
    // .set("Fricadelle", 0)
    // .set("Brochette", 0);

    /**
     * initialisation en dur des items frites à afficher sur la page de commande
     */
    this.frites = [
      new ItemMenu(1, 'Frite', 'Grande', 0, 4),
      new ItemMenu(2, 'Frite', 'Moyenne', 0, 2.5),
      new ItemMenu(3, 'Frite', 'Petite', 0, 1.5)
    ];

    /*
    * initialisation en dur des items boissons à afficher sur la page de commande
    */
    this.boissons = [
      new ItemMenu(1, 'coca', 'coca', 0, 1),
      new ItemMenu(2, 'coca', 'pepsi', 0, 1),
      new ItemMenu(3, 'coca', 'fanta', 0, 1)
    ];

    /*
    * initialisation en dur des items viandes à afficher sur la page de commande
    */
    this.viandes = [
      new ItemMenu(1, 'steak', 'steak', 0, 4),
      new ItemMenu(1, 'fricadelle', 'fricadelle', 0, 3),
      new ItemMenu(1, 'merguez', 'merguez', 0, 3.5)
    ];

    /**
     * initialisation de la liste des produits commandés par le client
     */
    this.listProduits = new Map<string, number>();

    /**
     * initialisation d'une commande
     */
    this.commande = new Commandes('', null, null);

  }

  /**
   * réinitialise les variables en cas d'annulation de la commande
   */
  reinitialiser() {

    this.prixTotal = 0;

    this.frites = [
      new ItemMenu(1, 'Frite', 'Grande', 0, 4),
      new ItemMenu(2, 'Frite', 'Moyenne', 0, 2.5),
      new ItemMenu(3, 'Frite', 'Petite', 0, 1.5)
    ];

    this.boissons = [
      new ItemMenu(1, 'coca', 'coca', 0, 1),
      new ItemMenu(2, 'coca', 'pepsi', 0, 1),
      new ItemMenu(3, 'coca', 'fanta', 0, 1)
    ];

    this.viandes = [
      new ItemMenu(1, 'steak', 'steak', 0, 4),
      new ItemMenu(1, 'fricadelle', 'fricadelle', 0, 3),
      new ItemMenu(1, 'merguez', 'merguez', 0, 3.5)
    ];

    this.listProduits = new Map<string, number>();
    this.commande = new Commandes('', null, null);

  }

  /**
   * ajoute un produit dans la liste des produits commandés par le client
   * @param produit
   */
  ajout(produit: ItemMenu) {
    produit.setQuantite(produit.getQuantite() + 1);
    this.ajouterPrix(produit);
    this.listProduits.set(produit.getNom(), produit.getQuantite());
  }

  /**
   * retire un produit dans la liste des produits commandés par le client
   * @param produit
   */
  retirer(produit: ItemMenu) {
    if (produit.getQuantite() > 0) {
      produit.setQuantite(produit.getQuantite() - 1);
      this.retirerPrix(produit);
      this.listProduits.set(produit.getNom(), produit.getQuantite());
    }
  }

  /**
   * ajoute au total le prix du produit commandé
   * @param produit
   */
  ajouterPrix(produit: ItemMenu) {
    this.prixTotal += produit.getPrix();
  }

  /**
   * retire au total le prix du produit annulé par le client
   * @param produit
   */
  retirerPrix(produit: ItemMenu) {
    this.prixTotal -= produit.getPrix();
  }

  /**
   * valide la commande qui est ensuite enregistrée sur le server json
   * transformation de  la map en objet json à finir
   */
  encaisser() {
    if (this.prixTotal !== 0) {
      this.date = new Date().toUTCString();
      //this.commande = new Commandes(this.date,JSON.stringify(this.strMapToTab(this.listProduits)),this.prixTotal);
      //this.commande = new Commandes(this.date,[{boisson : "coca", frites : "grande"}],this.prixTotal);
      this.commande = new Commandes(this.date, this.strMapToObj2(this.listProduits), this.prixTotal);
      this.commandes.push(this.commande);
      this.commandesService.postCommande(this.commande);

      this.reinitialiser();

    }
  }

 /**
  * Transforme la liste des produits commandés par le client en objet
  * car on ne peut insérer directement une map sur le server json
  * @param strMap
  */
 strMapToObj2(strMap: Map<string, number>) {
  const obj = Object.create(null);
  for (const [k, v] of strMap) {
      obj[k] = v;
  }

  return obj;
  }

  rechercheTypeProduit(libelle : string){
    this.produits=this.produitsService.rechercheProduitsByLibelle(libelle);
    this.produits.subscribe((data)=>this.totalquantiteRestante=this.produitsService.rechercheQuantiteRestanteProduit(data));   
  }
 
  // rechercheTypeProduit(){
  //    this.produits =this.produitsService.getListProduits()
  //   .pipe(
  //     map(
  //       (produits: Produits[]) => produits.filter(
  //         (produits: Produits) => produits.libelle === 'Frite')      
  //     ),
  //   );

  //   this.produits.forEach( (produits:Produits[]) =>{
  //     produits.forEach((produit:Produits)=>{
  //       this.totalquantiteRestante += produit.quantiteRestante;
  //       console.log("this.totalquantiteRestante : "+this.totalquantiteRestante)    
  
  //     })
  //   }
  //   )
  // }

}
