import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produits } from '../models/produits';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';
import { map } from 'rxjs/operators';


const urlProduit = 'http://127.0.0.1:3000/produits';
@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private isIdentifier = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  logout() {
    this.isIdentifier = false;
    this.router.navigate(['/login']);
  }

  /**
   * Récuperation de la liste des produits
   */
  getListProduits(): Observable<Produits[]> {
    return this.httpClient.get<Produits[]>(urlProduit);
  }
  /**
   * Recherche d'un produit par le libellé
   *
   */

  searchProduit(libelle: string): void {
    const service = this;
    const param = libelle ?
    {
      params: new HttpParams().set('libelleProduits', libelle)
    } : {};
    this.httpClient.get<Produits[]>(urlProduit, param).subscribe((data) => {
      if (data.length === 1) {
        service.isIdentifier = true;
      } else {
        service.isIdentifier = false;
      }
      service.router.navigate(['./listproduits']);
      },
    );
  }

  putProduit(produit: Produits) {
    const url = `${urlProduit}/${produit.id}`;
    return this.httpClient.put(url, produit);
  }

  postProduit(produit: Produits) {
    return this.httpClient.post(urlProduit, produit);
  }

  deleteProduit (id: number) {
    const url = `${urlProduit}/${id}`;
    return this.httpClient.delete(url);
  }

  miseAJourQuantiteProduit(libelle: string ): Observable<Produits[]> {
    /* for (let [k,v] of listProduits) { */
      return this.getListProduits()
      .pipe(map(produits => produits.filter(produit => produit.libelle.includes(libelle))));

/* } */
  }

  // canActivate(): boolean {
  //   return this.isIdentifier;
  // }
}
