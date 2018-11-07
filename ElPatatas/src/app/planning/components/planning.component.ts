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
    
    this.fPlanning=new Array<boolean[]>();

    this.listUser.subscribe(
      (users: User[]) => {
        for(let i=0; i<users.length; i++){
          this.fPlanning[i]=new Array<boolean>();
          for(let j=0; j<this.semaine.length; j++){
            this.listPlanning.subscribe(
              (plannings: Planning[]) => {
     
                for(let k=0; k<plannings.length; k++){
                  if(
                    plannings[k].employe===users[i].id && 
                    this.formattedDateDDMMYY(new Date(plannings[k].date))===this.formattedDateDDMMYY(new Date(this.semaine[j]))
                  ){
                    if(plannings[k].midi===true){
                      this.fPlanning[i][j*2]=true;
                   
                    }else{
                      this.fPlanning[i][j*2]=false;
                    }
                    if(plannings[k].soir===true){
                      this.fPlanning[i][j*2+1]=true;
                    
                    }else{
                      this.fPlanning[i][j*2+1]=false;
                    }
                    k=10000000000000000000000000000000;
                  }else if(k===plannings.length-1){
                    this.fPlanning[i][j*2]=false;
                    this.fPlanning[i][j*2+1]=false;
                  }
                }
              }
            )
          }
        }
      }
    )
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
    let month = date.getMonth();
    let day = date.getDate();
    const year = date.getFullYear();

    let monthD = dateD.getMonth();
    let dayD = dateD.getDate();
    const yearD = dateD.getFullYear();

    let monthF = dateF.getMonth();
    let dayF = dateF.getDate();
    const yearF = dateF.getFullYear();
    if((month>=monthD && month<=monthF) && (day>=dayD && day<=dayF) && (year>=yearD && year<=yearF))
      return true;
    else
      return false;
  }

  addPlanning(employe: number, date: Date, midi:boolean, soir:boolean): void{
    this.planningservice.ajouterPlanning(new Planning(0,employe,date,midi,soir));
  }

}
