import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Commandes } from 'src/app/commandes/models/commandes';



const urlComptabilite = 'http://127.0.0.1:3000/comptabilite';
@Injectable({
  providedIn: 'root'
})
export class ComptabiliteService {
  private isIdentifier = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
   * Retour à la page login lors de la déconnection
   */
  logout() {
    this.isIdentifier = false;
    this.router.navigate(['/login']);
  }

  getBilan(date: Date): Observable<Commandes[]> {
    return this.httpClient.get<Commandes[]>(urlComptabilite);
  }
  getAchat() {

  }
  getVente() {

  }

  getHistoCommandes() {

  }
  


}
