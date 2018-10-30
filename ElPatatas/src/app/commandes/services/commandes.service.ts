import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commandes } from '../models/commandes';
import { Router } from '@angular/router';

/**
 * url d'accès aux commandes sur le server json
 */
const urlCommandes = 'http://127.0.0.1:3000/commandes';

/**
 * services de gestion des commandes (CRUD)
 */
@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  /**
   * booléen de présence d'une commande sur le server json
   */
  private isIdentifier = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
   * observable des commandes
   */
  getListCommandes(): Observable<Commandes[]> {
    return this.httpClient.get<Commandes[]>(urlCommandes);
  }

  /**
   * recherche d'une commande sur le server json à partir de son id
   * @param id 
   */
  searchCommande(id: string): void {
    const service = this;
    const param = id ?
    {
      params: new HttpParams().set('id', id)
    } : {};
    this.httpClient.get<Commandes[]>(urlCommandes, param).subscribe((data) => {
      if (data.length === 1) {
        service.isIdentifier = true;
      } else {
        service.isIdentifier = false;
      }
      service.router.navigate(['./listcommandes']);
      },
    );
  }

  /**
   * Mise à jour d'une commande sur le server json
   * @param commande 
   */
  putCommande(commande: Commandes) {
    const url = `${urlCommandes}/${commande.getId()}`;
    this.httpClient.put(url, commande).subscribe(data => {
      alert('Mise à jour reussi.');
    },
    error => {
      alert('Erreur lors de la mise à jour !!!');
    });
  }

  /**
   * ajout d'une commande sur le server json
   * @param commande 
   */
  postCommande(commande: Commandes) {
    this.httpClient.post(urlCommandes, commande).subscribe(data => {
      alert('enregistrement de la commande terminé.');
    },
    error => {
      alert('Echec de l\'enregistrement de la commande !!!');
    });
  }

  /**
   * suppression d'une commande sur le server json
   * @param id 
   */
  deletePCommande (id: number): void {
    const url = `${urlCommandes}/${id}`;
    this.httpClient.delete(url).subscribe(data => {
      alert('suppression de la commande terminée.');
    },
    error => {
      alert('Echec de la suppression de la commande !!!');
    });
  }

}
