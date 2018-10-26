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

  private selectedQuantiteAjoutProduit: number;
  private selectedDateLimiteProduit: Date;
  private selectedDateAchatProduit:Date;
  private selectedprixAchatProduit:number;

  private newAjouterProduit: string;

  /**
   * Call of services in the constructor
   * @param stocksservice :  stocksService
   * @param produitsservice : produitsService
   */
  constructor(private stocksservice: StocksService, private produitsservice: ProduitsService) { }

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
  supprimer(libelleStocks): void {
    this.stocksservice.deleteStock(libelleStocks);
  }

}
