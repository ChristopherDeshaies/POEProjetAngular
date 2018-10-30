import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitsService } from 'src/app/core/produits/services/produits.service';
import { Produits } from 'src/app/core/produits/models/produits';
import { map } from 'rxjs/operators';
import { delay, reject } from 'q';

/**
 * @author Christopher Deshaies
 */
@Component({
  selector: 'app-gestionstocks',
  templateUrl: './gestionstocks.component.html',
  styleUrls: ['./gestionstocks.component.css']
})
export class GestionstocksComponent implements OnInit {

  private listProduits: Observable<Produits[]>;

  private produitSelected: Produits;
  private newNomProduit: string;

  private codeFournisseur: string;
  private quantiteAjoutProduit: number;
  private dateLimiteProduit: Date;
  private dateAchatProduit:Date;
  private prixAchatProduit:number;

  private hiddenCategorie: boolean[];

  private mapQuantiteRestante:Map<String,number>;
  
  /**
   * Call of services in the constructor
   * @param stocksservice :  stocksService
   * @param produitsservice : produitsService
   */
  constructor(private produitsservice: ProduitsService) {
    this.hiddenCategorie = new Array<boolean>(); 
    this.mapQuantiteRestante = new Map<String,number>();
  }

  /**
   * At init list the stocks
   */
  ngOnInit() {
    this.listProduits=this.getListProduits();
    this.initHiddenCategorie();
    this.generateCompteurCategorie();
  }

  ngOnChange(){
    this.refresh();
  }

  /**
   * Function which affects the variable listProduits with Produits got back with the serviceStocks
   */
  getListProduits(): Observable<Produits[]> {
    return this.produitsservice.getListProduits();
  }

  /**
   * Function which calls the function deleteStock in the service StocksService
   * @param libelleStocks : LibelleProduit has to delete of Stocks
   */
  supprimer(idProduit): void {

    new Promise((resolve,reject) => {
      this.produitsservice.deleteProduit(idProduit).subscribe(resolve,reject);
    }).then(
      () =>  this.refresh()
    );
    
   
  }

  ajouterProduitStock(): void{
    let produitNom:String;

    if(this.produitSelected){
      produitNom=this.produitSelected.libelle
    }else{
      produitNom=this.newNomProduit;
    }
    
    new Promise((resolve,reject) => {
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
      () => this.refresh()
    );
    
  }

  changeHiddenCategorie(i): void{
    if(this.hiddenCategorie[i])
      this.hiddenCategorie[i]=false;
    else
      this.hiddenCategorie[i]=true;
  }

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

  generateCompteurCategorie(): void{
    this.mapQuantiteRestante = new Map<String,number>();

    let listproduit:Observable<Produits[]> = this.produitsservice.getListProduits();

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

  getQuantiteRestant(libelle): number{
    return this.mapQuantiteRestante.get(libelle);
  }

  refresh(): void{
    this.listProduits=this.getListProduits();
    this.generateCompteurCategorie();
  }

}
