import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Produits } from '../models/produits';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';
import { map, finalize } from 'rxjs/operators';


const urlProduit = 'http://127.0.0.1:3000/produits';
@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private isIdentifier = false;
  private totalquantiteRestante: number = 0;

  constructor(private httpClient: HttpClient, private router: Router) { }

  logout() {
    this.isIdentifier = false;
    this.router.navigate(['/login']);
  }

  /**
   * Récuperation de la liste des produits
   */
  getListProduits(): Observable<Produits[]> {
    /*return this.httpClient.get<Produits[]>(urlProduit).pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => Produits.fromJson(jsonItem))
      )
    )*/
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

  /**
   * Modification du produit en base
   * @param produit 
   */
  putProduit(produit: Produits) {
    const url = `${urlProduit}/${produit.id}`;
    return this.httpClient.put(url, produit);
  }

  /**
   * Ajout du produit en base
   * @param produit 
   */
  postProduit(produit: Produits) {
    return this.httpClient.post(urlProduit, produit);
  }

  /**
   * Suppression du produit en base
   * @param id 
   */
  deleteProduit (id: number) {
    const url = `${urlProduit}/${id}`;
    return this.httpClient.delete(url);
  }

  miseAJourQuantiteProduit(libelle: string): Observable<Produits[]> {
    /* for (let [k,v] of listProduits) { */
    return this.getListProduits()
      .pipe(map(produits => produits.filter(produit => produit.libelle.includes(libelle))));

    /* } */
  }

  rechercheProduitsByLibelle(libelle: string): Observable<Produits[]> {
    return this.getListProduits()
      .pipe(
        map(
          (produits: Produits[]) => produits.filter(
            (produits: Produits) => produits.libelle === libelle)
        )
      )
  }

  rechercheQuantiteRestanteProduit(produits: Produits[]): number {
    let that = this;
    that.totalquantiteRestante =0;
    produits.forEach(
      (produit: Produits) => {
        that.totalquantiteRestante += produit.quantiteRestante;
      })
      ;
    return that.totalquantiteRestante;
  }

  // canActivate(): boolean {
  //   return this.isIdentifier;
  // }
}
