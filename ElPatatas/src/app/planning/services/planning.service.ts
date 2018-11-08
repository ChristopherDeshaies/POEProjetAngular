import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planning } from '../models/planning';

const urlPlanning = 'http://127.0.0.1:3000/planning';

/**
 * @author Christopher Deshaies
 */
@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  /**
   * Constructor dans lequel on récupère HttpClient
   * @param httpclient 
   */
  constructor(private httpclient: HttpClient) { }

  /**
   * Fonction qui récupère un Observable de la liste des plannings en base de données
   */
  getPlanning(): Observable<Planning[]> {
    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  /**
   * Fonction qui récupère un Observable de la liste des plannings en base de données après delete du planning avec l'identifiant id
   * @param id Identifant du Planning à delete
   */
  deletePlanning(id): Observable<Planning[]> {
    this.httpclient.delete(`${urlPlanning}/${id}`).subscribe(
      error => {
        console.log('Delete du planning ' + id, error);
      }
    );
    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  /**
   * Fonction qui récupère un Observable de la liste des plannings en base de données après l'ajout du planning en paramètre
   * @param planning Planning à ajouter 
   */
  ajouterPlanning(planning: Planning): Observable<Planning[]> {
    this.httpclient.post(urlPlanning, planning).subscribe(
      error => {
        console.log('Ajout au planning ', error);
      }
    );

    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  /**
   * Fonction qui récupère un Observable de la liste des plannings en base de données après modification du planning indiqué en paramètre
   * @param planning Planning à modifier
   */
  modificationPlanning(planning: Planning): Observable<Planning[]> {
    this.httpclient.put(`${urlPlanning}/${planning.id}`, planning ).subscribe(
      
      error => {
        console.log('Modifier le planning ' + planning.id + ' en ' + planning, error);
      }
    );
    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  /**
   * Fonction qui recherche un planning en fonction d'un identifiant d'employé et d'une date demandée et tourne une promise booléen
   * @param employe Identifiant de l'employé à rechercher
   * @param date Date à rechercher
   */
  findPlanning(employe: number, date: Date): Promise<boolean>{
    return new Promise(
      (resolve, reject) => {
        this.httpclient.get<Planning[]>(urlPlanning).subscribe(
          (plannings : Planning[]) => {
            let planningR = plannings.find(
              (planning: Planning) => {
                return (planning.employe===employe && this.compareDate(date, new Date(planning.date)) );
              }
            );
            if(planningR!==undefined){
              resolve(true);
            }else{
              resolve(false);
            }
          }
        )
      }
    );
  }

  /**
   * Fonction qui compare 2 dates
   * @param date1 Première date à comparer
   * @param date2 Deuxième date à comparer
   */
  compareDate(date1 : Date, date2 : Date): boolean{
    let month1 = String(date1.getMonth() + 1);
    let day1 = String(date1.getDate());
    const year1 = String(date1.getFullYear());

    let month2 = String(date2.getMonth() + 1);
    let day2 = String(date2.getDate());
    const year2 = String(date2.getFullYear());

    if(month1===month2 && day1===day2 && year1===year2)
      return true;
    else
      return false;
  }
}
