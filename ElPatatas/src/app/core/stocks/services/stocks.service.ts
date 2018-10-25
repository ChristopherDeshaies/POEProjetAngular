import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stocks } from '../model/stocks';

const urlStocks = 'http://127.0.0.1:3000/stocks';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private httpclient: HttpClient) { }

  getStock(): Observable<Stocks[]> {
    return this.httpclient.get<Stocks[]>(urlStocks);
  }

  deleteStock(libelleProduit): Observable<Stocks[]> {
    this.httpclient.delete(`${urlStocks}?libelleProduit=${libelleProduit}`).subscribe(
      error => {
        console.log('Delete du stock ' + libelleProduit, error);
      }
    );
    return this.httpclient.get<Stocks[]>(urlStocks);
  }

  ajouterStock(libelleProduit, quantiteProduit): Observable<Stocks[]> {
    this.httpclient.post(`${urlStocks}`, {libelleProduit, quantiteProduit}).subscribe(
      error => {
        console.log('Ajouter au stock' + libelleProduit, error);
      }
    );
    return this.httpclient.get<Stocks[]>(urlStocks);
  }

  modificationStock(libelleProduit, newlibelleProduit, quantiteProduit): Observable<Stocks[]> {
    this.httpclient.put(`${urlStocks}?libelleProduit=${libelleProduit}`, {newlibelleProduit, quantiteProduit} ).subscribe(
      error => {
        console.log('Modifier le stock ' + libelleProduit + ' en ' + newlibelleProduit, error);
      }
    );
    return this.httpclient.get<Stocks[]>(urlStocks);
  }
}
