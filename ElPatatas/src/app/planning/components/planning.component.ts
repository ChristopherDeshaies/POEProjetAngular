import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users/users.service';
import { Observable,of } from 'rxjs';
import { User } from 'src/app/core/users/models/user';
import { PlanningService } from '../services/planning.service';
import { Planning } from '../models/planning';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  public taille = new Array<number>();
  public listUser: Observable<User[]>;
  public listPlanning: Observable<Planning[]>;

  public semaine: Date[];
  public fPlanning: boolean[][]=undefined;

  constructor(private usersservice: UsersService, private planningservice: PlanningService) {
    for(let i=0;i<14;i++)
    {
      this.taille.push(i);
    }    
   }

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
    this.refreshPlanning();
  }

  ngOnChange(){
    this.refreshPlanning();
  }

  refreshPlanning(){
    this.listPlanning = this.getPlanning(); 
    let LfPlanning=new Array<boolean[]>();
    this.listPlanning.pipe(
      map((plannings: Planning[]) => {
        this.listUser.pipe(
          map((users: User[]) => {
            for(let i=0; i<users.length; i++){
              LfPlanning[i]=new Array<boolean>();
              for(let j=0; j<this.semaine.length; j++){
                if(plannings.length>0){
                  for(let k=0; k<plannings.length; k++){
                    if(
                      plannings[k].employe===users[i].id && 
                      this.formattedDateDDMMYY(new Date(plannings[k].date))===this.formattedDateDDMMYY(new Date(this.semaine[j]))
                    ){
                      if(plannings[k].midi===true){
                        LfPlanning[i][j*2]=true;
                      }else{
                        LfPlanning[i][j*2]=false;
                      }
                      if(plannings[k].soir===true){
                        LfPlanning[i][j*2+1]=true;
                      }else{
                        LfPlanning[i][j*2+1]=false;
                      }
                      k=10000000000000000000000000000000;
                    }else if(k===plannings.length-1){
                      LfPlanning[i][j*2]=false;
                      LfPlanning[i][j*2+1]=false;
                    }
                  }
                }else{
                  for(let k=0; k<14; k ++){
                    LfPlanning[i][k]=false;
                  }
                }
              }
            } 
          }
        ),
        finalize( ()=> {
          this.fPlanning = LfPlanning;
        })
        ).subscribe();
      }
      ),
      finalize( ()=> {}
      ) 
    ).subscribe();
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
    this.refreshPlanning();
  }

  nextSemaine(): void {
    for(let jour = 0; jour <=6; jour++){
      this.semaine[jour]=this.addJour(this.semaine[jour],7);
    }
    this.refreshPlanning();
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

  getPlanning(): Observable<Planning[]>{
    return this.planningservice.getPlanning();
  }

  addPlanning(employe: number, date: Date, midi:boolean, soir:boolean){
    this.listPlanning.pipe(
      map(
        (plannings: Planning[]) => {
          console.log(plannings);
          return plannings.filter(
             (planning:Planning) => {
                if(planning.employe===employe && this.formattedDateDDMMYY(new Date(planning.date))===this.formattedDateDDMMYY(date)){
                  return true;
                }else{
                  return false;
                }
              }
          );
        }
      )
    ).subscribe(
      (plannings: Planning[]) => {
        if(plannings.length>0){
          if(midi){
            this.planningservice.modificationPlanning(new Planning(plannings[0].id,employe,date,midi,plannings[0].soir)).toPromise().then(() => this.refreshPlanning());
          }else if(soir){
            this.planningservice.modificationPlanning(new Planning(plannings[0].id,employe,date,plannings[0].midi,soir)).toPromise().then(() => this.refreshPlanning());
          }
        }else{
          this.planningservice.ajouterPlanning(new Planning(0,employe,date,midi,soir)).toPromise().then(() => this.refreshPlanning());
        }
      }
    );
    
  }

  deletePlanning(employe: number, date: Date, midi:boolean, soir:boolean){
    this.listPlanning.pipe(
      map(
        (plannings: Planning[]) => {
          return plannings.filter(
             (planning:Planning) => planning.employe===employe && this.formattedDateDDMMYY(new Date(planning.date))===this.formattedDateDDMMYY(date)
          );
        }
      ) 
    ).subscribe(
      (plannings: Planning[]) => {
          if(midi){
            if(!plannings[0].soir){
              this.planningservice.deletePlanning(plannings[0].id).toPromise().then(
                () => this.refreshPlanning()
              );;
            }else{
              this.planningservice.modificationPlanning(new Planning(plannings[0].id,employe,date,false,plannings[0].soir)).toPromise().then(
                () => this.refreshPlanning()
              );;
            }
          }else if(soir){
            if(!plannings[0].midi){
              this.planningservice.deletePlanning(plannings[0].id).toPromise().then(
                () => this.refreshPlanning()
              );;
            }else{
              this.planningservice.modificationPlanning(new Planning(plannings[0].id,employe,date,plannings[0].midi,false)).toPromise().then(
                () => this.refreshPlanning()
              );;
            }
          }
      }
    );

  }

  getSemaine(j : number):number {
    return Math.round((j/2));
  }

  verificationMidi(j : number): boolean{
    if(j/2 === Math.round(j/2))
      return true; 
    else
      return false;
  }

}
