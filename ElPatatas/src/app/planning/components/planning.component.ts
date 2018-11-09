import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users/users.service';
import { Observable,of } from 'rxjs';
import { User } from 'src/app/core/users/models/user';
import { PlanningService } from '../services/planning.service';
import { Planning } from '../models/planning';
import { map, finalize } from 'rxjs/operators';

/**
 * @author Christopher Deshaies
 */
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  /**
   * Variable dans laquelle est stocké un observable des users
   */
  public listUser: Observable<User[]>;

  /**
   * Variable dans laquelle est stocké un observable des plannings
   */
  public listPlanning: Observable<Planning[]>;

  /**
   * Tableau contenant les dates du planning de la semaine affiché
   */
  public semaine: Date[];

  /**
   * Tableau contenant l'affectation des users par demi-journée
   */
  public fPlanning: boolean[][]=undefined;

  /**
   * Liste contenant une suite de nombres entre 0 et 13 inclus
   */
  public taille = new Array<number>();

  /**
   * Constructeur du component PlanningComponent
   * @param usersservice Service des Users
   * @param planningservice Service des Plannings
   */
  constructor(private usersservice: UsersService, private planningservice: PlanningService) {
    for(let i=0;i<14;i++){
      this.taille.push(i);
    }    
  }

  /**
   * Init au démarrage de la feature Planning
   */
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

  /**
   * Fonction qui rafraichit le tableau fPlanning[][] en fonction des affectations de la semaine 
   */
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

  /**
   * Initialisation une date en fonction du numéro i d'une journée 
   * @param i Le nombre de jours à retirer sur la date courante
   * @returns La date de début de la semaine
   */
  initDebutSemaine(i: number): Date{
    var dateTime = new Date().getTime();
    var endTime = dateTime - ( i * (60*60*24) * 1000)
    return new Date(endTime);
  }

  /**
   * Ajoute à la date "date" un nombre de jours "nb" indiqués
   * @param date Une date à modifier
   * @param nb Le nombre de jours à ajouter à la date 
   * @returns Retourne la nouvelle date générée
   */
  addJour(date: Date, nb: number): Date{
    var dateTime = date.getTime();
    var endTime = dateTime + ( nb * (60*60*24) * 1000)
    return new Date(endTime);
  }

  /**
   * Retire à la date "date" un nombre de jours "nb" indiqués
   * @param date une date à modifier
   * @param nb le nombre de jours à retirer à la date 
   * @returns Retourne la nouvelle date générée
   */
  removeJour(date:Date, nb: number): Date{
    var dateTime = date.getTime();
    var endTime = dateTime - ( nb * (60*60*24) * 1000)
    return new Date(endTime);
  }

  /**
   * Fonction qui passe le planning à la semaine précédente
   */
  previusSemaine(): void{
    for(let jour = 0; jour <=6; jour++){
      this.semaine[jour]=this.removeJour(this.semaine[jour],7);
    }
    this.refreshPlanning();
  }

  /**
   * Fonction qui passe le planning à la semaine suivante
   */
  nextSemaine(): void {
    for(let jour = 0; jour <=6; jour++){
      this.semaine[jour]=this.addJour(this.semaine[jour],7);
    }
    this.refreshPlanning();
  }

  /**
   * Fonction qui formate une date passée en paramètre en format ddMMyyyy
   * @param date La date à retourner au format ddMMyyyy
   * @returns Retourne un string de la date au format souhaité
   */
  formattedDateDDMMYY(date: Date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${day}/${month}/${year}`;
  }

  /**
   * Fonction qui formate une date passée en paramètre en format ddMM
   * @param date La date à retourner en format ddMM
   * @returns Retourne un string de la date au format souhaité
   */
  formattedDateDDMM(date:Date){
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${day}/${month}`;
  }

  /**
   * Fonction qui retourne un observable<User[]> des Users en base
   * @returns Retourne le résultat de la fonction getListUsers() qui est dans le service Users
   */
  getUsers(): Observable<User[]>{
    return this.usersservice.getListUsers();
  }

  /**
   * Fonction qui retourne un observable<Planning[]> des Planning en base
   * @returns Retourne le résultat de la fonction getPlanning() qui est dans le service Planning
   */
  getPlanning(): Observable<Planning[]>{
    return this.planningservice.getPlanning();
  }

  /**
   * Fonction qui associe un employé à une demi-journée
   * @param employe L'identifiant de l'employé
   * @param date La date de la journée
   * @param midi Boolean indiquant s'il s'agit du midi
   * @param soir Boolean indiquant s'il s'agit du soir
   */
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

  /**
   * Fonction qui retire un employé d'une demi-journée
   * @param employe L'identifiant de l'employé
   * @param date La date de la journée
   * @param midi Boolean indiquant s'il s'agit du midi
   * @param soir Boolean indiquant s'il s'agit du soir
   */
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

  /**
   * Fonction qui le numéro du jour de la semaine
   * @param j Numéro de la journée de la semaine
   */
  getSemaine(j : number):number {
    return Math.round((j/2));
  }

  /**
   * Fonction qui vérifie si on est dans le td matin ou le td soir
   * @param j Numéro de la journée de la semaine
   */
  verificationMidi(j : number): boolean{
    if(j/2 === Math.round(j/2))
      return true; 
    else
      return false;
  }

}
