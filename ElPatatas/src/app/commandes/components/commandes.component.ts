import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '../models/itemmenu';
import { Commandes } from '../models/commandes';
import { CommandesService } from '../services/commandes.service';
import { ProduitsService } from '../../core/produits/services/produits.service';
import { Produits } from '../../core/produits/models/produits';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProduitsEnVenteService } from 'src/app/core/produitEnVente/services/produitsEnVente';
import { ProduitsEnVente } from 'src/app/core/produitEnVente/model/produitsEnVente';


/**
 * gestion des commandes prises par l'employé
 */
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  /**
   * liste temporaire de produits
   */
  produits: Observable<Produits[]>;

  /**
   * liste de tous les produits en base
   */
  listeProduitsBase: Observable<Produits[]>;

  /**
   * quantité restante d'un produit
   */
  totalquantiteRestante: number = 0;

  /**
   * liste des produits frites à afficher sur la page commande
   */
  frites: ItemMenu[];

  /**
   * liste des boissons à afficher sur la page commande
   */
  boissons: ItemMenu[];

  /**
   * liste des viandes à afficher sur la page commande
   */
  viandes: ItemMenu[];

  /**
   * variable de la commande en cours
   */
  commande: Commandes;

  /**
   * liste des produits commandés par le client
   */
  listProduits: ItemMenu[];

  /**
   * liste des commandes prises par l'employées , à intégrer dans un composent liste des commandes
   */
  commandes: Array<Commandes>;

  /**
   * date de prise de la commande du client au format UTC
   */
  date: string;

  /**
   * Prix total de la commande
   */
  prixTotal: number = 0;

  /**
   * liste de tous les libelles produits à vendre en base
   */
  listLibellesProduitsEnVente: Observable<ProduitsEnVente[]>;

  constructor(
    private commandesService: CommandesService,
    private produitsService: ProduitsService,
    private produitenventeservice: ProduitsEnVenteService
  ) {

  }

  ngOnInit() {

    /**
     * initialisation des commandes prises par le client
     */
    this.commandes = new Array<Commandes>();

    /**
     * initialisation des items frites à afficher sur la page de commande
     */
    this.frites = [];

    /*
    * initialisation des items boissons à afficher sur la page de commande
    */
    this.boissons = [];

    /*
    * initialisation des items viandes à afficher sur la page de commande
    */
    this.viandes = [];

    /**
     * initialisation de la liste des produits commandés par le client
     */
    this.listProduits = [];

    /**
     * initialisation d'une commande
     */
    this.commande = new Commandes('', null, null);

    /**
     * initialisation des informations produits à afficher sur la page
     */
    this.initialisationVentes();

  }

  /**
   * réinitialise les variables en cas d'annulation de la commande
   */
  reinitialiser() {
    
    this.prixTotal = 0;

    this.frites = [];

    this.boissons = [];

    this.viandes = [];

    this.listProduits = [];

    this.commande = new Commandes('', null, null);

    this.initialisationVentes();

  }

  /**
   * ajoute un produit dans la liste des produits commandés par le client et à l'affichage en dessous de l'item
   * @param produit
   */
  ajout(produit: ItemMenu) {
    if ((produit.getQuantiterestante() > 0) && ((produit.getQuantite()) < produit.getQuantiterestante())) {
      produit.setQuantite(produit.getQuantite() + 1);
      this.ajouterPrix(produit);
      if (this.listProduits.length > 0) {
        let i;
        let trouve: boolean = false;

        for (i = 0; (i < this.listProduits.length); i++) {
          if (this.listProduits[i].getLibelle() === produit.getLibelle()) {
            this.listProduits[i].setQuantite(this.listProduits[i].getQuantite());
            trouve = true;
            break;
          }
        }
        if (!trouve) {
          this.listProduits[this.listProduits.length] = produit;

        }
      } else {
        this.listProduits[0] = produit;
      }
    } else {
      alert("Le stock de "+ produit.getLibelle() + " est épuisé")
    }
  }

  /**
   * retire un produit dans la liste des produits commandés par le client et à l'affichage en dessous de l'item
   * @param produit
   */
  retirer(produit: ItemMenu) {
    if (produit.getQuantite() > 0) {
      produit.setQuantite(produit.getQuantite() - 1);
      this.retirerPrix(produit);
      let i;
      for (i = 0; (i < this.listProduits.length); i++) {
        if (this.listProduits[i].getLibelle() === produit.getLibelle()) {
          if (this.listProduits[i].getQuantite()==0){
            this.listProduits.splice(i, 1);
          }else{  
            this.listProduits[i].setQuantite(this.listProduits[i].getQuantite())
          }
        }
      }
    }else {
      alert("Vous n'en avez pas encore commandé")
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
      //this.commande = new Commandes(this.date, this.strMapToObj2(this.listProduits), this.prixTotal);
      this.commande = new Commandes(this.date, this.listProduits, this.prixTotal);
      this.commandes.push(this.commande);
      this.commandesService.postCommande(this.commande);

      this.miseAjourStocks();
      this.miseAjourStocks();

      // new Promise(
      //     (resolve,reject) => {
      //       this.miseAjourStocks()
      //     }
      // ).then(
      //     () => this.miseAjourStocks();
      //   );

       
      

    }
  }

  /**
   * Transforme la liste des produits commandés par le client en objet
   * car on ne peut insérer directement une map sur le server json
   * @param strMap
   */
  // strMapToObj2(strMap: Map<string, number>) {
  //   const obj = Object.create(null);
  //   for (const [k, v] of strMap) {
  //     obj[k] = v;
  //   }

  //   return obj;
  // }

  /**
   * Fonction qui retoune une liste de ProduitsEnVente en base de donnée
   */
  getListProduitsEnVente(): Observable<ProduitsEnVente[]> {
    return this.produitenventeservice.getProduitEnVente()
      .pipe(
        map(
          (produitsEnVente: ProduitsEnVente[]) => produitsEnVente
        )
      )
  }

  initialisationVentes() {
    this.listLibellesProduitsEnVente = this.getListProduitsEnVente();
    this.listLibellesProduitsEnVente.subscribe(
      (data) => {
        data.forEach(
          (produitsEnVente: ProduitsEnVente) => {
            this.initItem(produitsEnVente);
          });
      }
    )
    this.recupQuantiterestante()
  }

  initItem(produitsEnVente: ProduitsEnVente) {
    switch (produitsEnVente.categorie) {
      case "frite": {
        this.frites[this.frites.length] = new ItemMenu(produitsEnVente.libelle, 0, produitsEnVente.prixvente, 0);
        break;
      }
      case "viande": {
        this.viandes[this.viandes.length] = new ItemMenu(produitsEnVente.libelle, 0, produitsEnVente.prixvente, 0);
        break;
      }
      case "boisson": {
        this.boissons[this.boissons.length] = new ItemMenu(produitsEnVente.libelle, 0, produitsEnVente.prixvente, 0);
        break;
      }
      default: {
        break;
      }
    }
  }

  recupQuantiterestante(): void {

    let listproduit: Observable<Produits[]> = this.produitsService.getListProduits()

    listproduit.forEach(
      (produits: Produits[]) => {
        let that = this;
        produits.forEach(
          (produit: Produits) => {
            that.totalquantiteRestante = 0;
            that.totalquantiteRestante += +JSON.stringify(produit.quantiteRestante);
            this.initQuantiteRestanteItem(produit.libelle, that.totalquantiteRestante);
          }
        )
      }
    );
  }

  initQuantiteRestanteItem(libelle: string, totalquantiteRestante: number) {

    for (let i = 0; i < this.frites.length; i++) {
      if ("Frite" === libelle) {
        let totalquantiteRestanteAvant = this.frites[i].getQuantiterestante();
        totalquantiteRestante += totalquantiteRestanteAvant;
        this.frites[i].setQuantiterestante(totalquantiteRestante);
      }
    }

    for (let i = 0; i < this.viandes.length; i++) {
      if (this.viandes[i].getLibelle() === libelle) {
        let totalquantiteRestanteAvant = this.viandes[i].getQuantiterestante();
        totalquantiteRestante += totalquantiteRestanteAvant;
        this.viandes[i].setQuantiterestante(totalquantiteRestante);
      }
    }

    for (let i = 0; i < this.boissons.length; i++) {
      if (this.boissons[i].getLibelle() === libelle) {
        let totalquantiteRestanteAvant = this.boissons[i].getQuantiterestante();
        totalquantiteRestante += totalquantiteRestanteAvant;
        this.boissons[i].setQuantiterestante(totalquantiteRestante);
      }
    }

  }

  miseAjourStocks() {
    for (let i = 0; i < this.listProduits.length; i++) {
      this.miseajour(this.listProduits[i])
    }         
  }

  sortProduitsLibelleBydate(libelle : string) :Observable<Produits[]>{
    let listproduit: Observable<Produits[]> = this.produitsService.produitsByLibelle(libelle)
    .pipe(map(items => items.sort(this.comparer)));
    return listproduit
  }

  miseajour(itemmenu : ItemMenu){
    let listproduit: Observable<Produits[]> =this.sortProduitsLibelleBydate(itemmenu.getLibelle());

    listproduit.forEach(
      (produits: Produits[]) => {
        let that = this;
        produits.forEach(
          (produit: Produits) => {
           if(produit.quantiteRestante >= itemmenu.getQuantite()){
             produit.quantiteRestante = produit.quantiteRestante - itemmenu.getQuantite()
              this. miseajourproduit(produit);
              itemmenu.setQuantite(0);
           }else{
            produit.quantiteRestante = 0;
            itemmenu.setQuantite(itemmenu.getQuantite()-produit.quantiteRestante);
            this. miseajourproduit(produit);
           }
          }
        )
      }
    );
  }

  miseajourproduit(produit : Produits){
    this.produitsService.putProduit(produit)
  }

  comparer(produit1: Produits , produit2: Produits) {
    if (produit1.dateLimite < produit2.dateLimite)
      return -1;
    if (produit1.dateLimite > produit2.dateLimite)
      return 1;
    return 0;
  }

}
