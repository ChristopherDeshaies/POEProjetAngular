import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StocksService } from '../../../core/stocks/services/stocks.service';
import { Stocks } from 'src/app/core/stocks/model/stocks';
import { ProduitsService } from 'src/app/core/produits/services/produits.service';
import { Produits } from 'src/app/core/produits/models/produits';

/**
 * @author Christopher Deshaies
 */
@Component({
  selector: 'app-gestionstocks',
  templateUrl: './gestionstocks.component.html',
  styleUrls: ['./gestionstocks.component.css']
})
export class GestionstocksComponent implements OnInit {

  private listStocks: Observable<Stocks[]>;
  private listProduits: Observable<Produits[]>;

  private produitSelected: Produits;

  private newNomProduit: string;
  private newCodeFournisseur: string;
  
  private quantiteAjoutProduit: number;
  private dateLimiteProduit: Date;
  private dateAchatProduit:Date;
  private prixAchatProduit:number;

  private sumProduit:number[];
  private j:number;
  
  /**
   * Call of services in the constructor
   * @param stocksservice :  stocksService
   * @param produitsservice : produitsService
   */
  constructor(private stocksservice: StocksService, private produitsservice: ProduitsService) {
    this.sumProduit = new Array();
  }

  /**
   * At init list the stocks
   */
  ngOnInit() {
    this.getListStocks();
    this.getListProduits();
  }

  /**
   * Function which affects the variable listStocks with Stocks got back with the serviceStocks
   */
  getListStocks(): void {
    this.listStocks = this.stocksservice.getStock();
  }

  getListProduits(): void {
    this.listProduits = this.produitsservice.getListProduits();
  }

  /**
   * Function which calls the function deleteStock in the service StocksService
   * @param libelleStocks : LibelleProduit has to delete of Stocks
   */
  supprimer(idProduit): void {
    this.produitsservice.deleteProduit(idProduit);
  }

  ajouterProduitStock(): void{
    if(this.produitSelected){
      this.produitsservice.postProduit(
        new Produits(
          this.produitSelected.libelle, 
          this.produitSelected.codeFournisseur, 
          this.quantiteAjoutProduit,
          this.dateLimiteProduit,
          this.dateAchatProduit,
          this.prixAchatProduit
        ) 
      );
      return;
    }

    this.produitsservice.postProduit(
      new Produits(
        this.newNomProduit, 
        this.newCodeFournisseur, 
        this.quantiteAjoutProduit,
        this.dateLimiteProduit,
        this.dateAchatProduit,
        this.prixAchatProduit
      ) 
    );

  }

  addSumProduit( i,j, quantiteRestant): void{
    if(j===0){
      this.j=0;
    }
    if(this.j!==j){
      this.sumProduit[i]+=quantiteRestant;
    }else{
      this.sumProduit[i]=quantiteRestant;
    }
  }

}
