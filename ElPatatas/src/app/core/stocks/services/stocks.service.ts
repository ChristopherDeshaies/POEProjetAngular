import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../users/models/users';

const urlStock = 'http://127.0.0.1:3000/stocks';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private httpclient: HttpClient) { }

  getStock(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(urlStock);
  }

  deleteStock(libelleProduit): Observable<Users[]> {
    this.httpclient.delete(`${urlStock}/${libelleProduit}`).subscribe(
      error => { console.log('delete du stock' , error);
    }
    );
    return this.httpclient.get<Users[]>(urlStock);
  }

  ajouterStock(libelleProduit, quantiteProduit): Observable<Users[]> {
    this.httpclient.post(`${urlStock}`, {libelleProduit, quantiteProduit}).subscribe(
      error => { console.log('ajouter au stock' , error);
    }
    );
    return this.httpclient.get<Users[]>(urlStock);
  }
}
