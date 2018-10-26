import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produits } from '../models/produits';
import { Router } from '@angular/router';


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
}
