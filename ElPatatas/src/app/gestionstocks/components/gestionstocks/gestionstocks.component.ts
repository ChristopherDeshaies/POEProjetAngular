import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StocksService } from '../../../core/stocks/services/stocks.service';
import { Stocks } from 'src/app/core/stocks/model/stocks';
import { ProduitsService } from 'src/app/core/produits/services/produits.service';

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
  }

  /**
   * Function which affects the variable listStocks with Stocks got back with the serviceStocks
   */
  getListStocks(): void {
    this.listStocks = this.stocksservice.getStock();
  }

  /**
   * Function which calls the function deleteStock in the service StocksService
   * @param libelleStocks : LibelleProduit has to delete of Stocks
   */
  supprimer(libelleStocks): void {
    this.stocksservice.deleteStock(libelleStocks);
  }

}
