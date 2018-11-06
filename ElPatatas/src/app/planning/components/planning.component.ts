import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/users/models/user';
import { PlanningService } from '../services/planning.service';
import { Planning } from '../models/planning';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  public listUser: Observable<User[]>;
  public listPlanning: Observable<Planning[]>;

  public semaine: Date[];
  public fPlanning: boolean[][];

  constructor(private usersservice: UsersService, private planningservice: PlanningService) { }

  ngOnInit() {
    this.listUser=this.getUsers();
    let date = new Date();
    let journeeDate = date.getDay();
  
    let debutSemaine=this.initDebutSemaine(journeeDate);
    this.semaine=[
      debutSemaine,
      this.addJour(debutSemaine,1),
      this.addJour(debutSemaine,2),
      this.addJour(debutSemaine,3),
      this.addJour(debutSemaine,4),
      this.addJour(debutSemaine,5),
      this.addJour(debutSemaine,6)
    ];

    this.listPlanning=this.getPlanning(this.semaine[0],this.semaine[6]);
    this.listPlanning.subscribe(
      /* (users: User[]) => {
        users.forEach(
          () => {}
        );
      } */
    );
    this.fPlanning=new Array<boolean[]>();
   
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

  initDebutSemaine(i: number): Date{
    var dateTime = new Date().getTime();
    var endTime = dateTime - ( i * (60*60*24) * 1000)
    return new Date(endTime);
  }

  addJour(date: Date, nb: number): Date{
    var dateTime = date.getTime();
    var endTime = dateTime + ( nb * (60*60*24) * 1000)
    return new Date(endTime);
  }

  removeJour(date:Date, nb: number): Date{
    var dateTime = date.getTime();
    var endTime = dateTime - ( nb * (60*60*24) * 1000)
    return new Date(endTime);
  }

  previusSemaine(): void{
    for(let jour = 0; jour <=6; jour++){
      this.semaine[jour]=this.removeJour(this.semaine[jour],7);
    }
  }

  nextSemaine(): void {
    for(let jour = 0; jour <=6; jour++){
      this.semaine[jour]=this.addJour(this.semaine[jour],7);
    }
  }

  formattedDateDDMMYY(date: Date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${day}/${month}/${year}`;
  }

  formattedDateDDMM(date:Date){
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${day}/${month}`;
  }


  getUsers(): Observable<User[]>{
    return this.usersservice.getListUsers();
  }

  getPlanning(dateDebutSemaine: Date, dateFinSemaine: Date): Observable<Planning[]>{
    return this.planningservice.getPlanning().pipe(
      map(
        (plannings: Planning[]) => {
          let lplanning : Planning[];
          lplanning = plannings.filter(
            (planning:Planning) => this.entreDate(new Date(planning.date),dateDebutSemaine,dateFinSemaine)
          );
          return lplanning;
        }
      )
    );
  }

  entreDate(date: Date, dateD: Date, dateF: Date): boolean{
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    let monthD = String(dateD.getMonth() + 1);
    let dayD = String(dateD.getDate());
    const yearD = String(dateD.getFullYear());

    let monthF = String(dateF.getMonth() + 1);
    let dayF = String(dateF.getDate());
    const yearF = String(dateF.getFullYear());
    if(month>=monthD && month<=monthF && day>=dayD && day<=dayF && year>=yearD && year<=yearF)
      return true;
    else
      return false;
  }

  addPlanning(employe: number, date: Date, midi:boolean, soir:boolean): void{
    this.planningservice.ajouterPlanning(new Planning(0,employe,date,midi,soir));
  }

  /* findPlanning(employe: number, date: Date, midi:boolean, soir:boolean): boolean{
    this.planningservice.findPlanning(employe,date,midi,soir).then(
      (planningFind) => {
        if(planningFind){
          return true;
        }else{
          return false;
        }
      }
    );
    return false;
  } */

}
