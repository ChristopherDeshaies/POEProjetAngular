import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planning } from '../models/planning';

const urlPlanning = 'http://127.0.0.1:3000/planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private httpclient: HttpClient) { }

  getPlanning(): Observable<Planning[]> {
    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  deletePlanning(id): Observable<Planning[]> {
    this.httpclient.delete(`${urlPlanning}/${id}`).subscribe(
      error => {
        console.log('Delete du planning ' + id, error);
      }
    );
    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  ajouterPlanning(planning: Planning): Observable<Planning[]> {
    this.httpclient.post(urlPlanning, planning).subscribe(
      error => {
        console.log('Ajout au planning ', error);
      }
    );

    return this.httpclient.get<Planning[]>(urlPlanning);
  }

  modificationPlanning(planning: Planning): Observable<Planning[]> {
    this.httpclient.put(`${urlPlanning}/${planning.id}`, planning ).subscribe(
      
      error => {
        console.log('Modifier le planning ' + planning.id + ' en ' + planning, error);
      }
    );
    return this.httpclient.get<Planning[]>(urlPlanning);
  }

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
