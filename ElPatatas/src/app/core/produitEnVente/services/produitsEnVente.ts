import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduitsEnVente } from '../model/produitsEnVente';

const urlProduitsEnVente = 'http://127.0.0.1:3000/produitsEnVente';

@Injectable({
  providedIn: 'root'
})
export class ProduitsEnVenteService {

  constructor(private httpclient: HttpClient) { }

  getProduitEnVente(): Observable<ProduitsEnVente[]> {
    return this.httpclient.get<ProduitsEnVente[]>(urlProduitsEnVente);
  }

  deleteProduitEnVente(id): Observable<ProduitsEnVente[]> {
    this.httpclient.delete(`${urlProduitsEnVente}/${id}`).subscribe(
      error => {
        console.log('Delete du stock du nouveau produit ' + id, error);
      }
    );
    return this.httpclient.get<ProduitsEnVente[]>(urlProduitsEnVente);
  }

  ajouterProduitEnVente(produitEnVente: ProduitsEnVente): Observable<ProduitsEnVente[]> {
    this.httpclient.post(urlProduitsEnVente, produitEnVente).subscribe(
      error => {
        console.log('Ajout en stock du nouveau produit ', error);
      }
    );

    return this.httpclient.get<ProduitsEnVente[]>(urlProduitsEnVente);
  }

  modificationProduitEnVente(libelle, newlibelle): Observable<ProduitsEnVente[]> {
    this.httpclient.put(`${urlProduitsEnVente}?libelle=${libelle}`, {newlibelle} ).subscribe(
      error => {
        console.log('Modifier le stock du produit ' + libelle + ' en ' + newlibelle, error);
      }
    );
    return this.httpclient.get<ProduitsEnVente[]>(urlProduitsEnVente);
  }

  findProduitEnVente(libelle): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        this.httpclient.get<ProduitsEnVente[]>(urlProduitsEnVente).subscribe(
          (produitsEnVente: ProduitsEnVente[]) => {
            let produit = produitsEnVente.find(
              (produitEnVente: ProduitsEnVente) => {
                return (produitEnVente.libelle===libelle);
              }
            );
            if(produit!==undefined){
              resolve(true);
            }else{
              resolve(false);
            }
          }
        );
      }
    );
  }



}
