import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  private ListUsers : Observable<User[]>;
  private isLoaded : boolean;
  private nom :string;
  private prenom :string;
  private adresse :string;
  private email :string;
  private password :string;
  private tel :string;
  private dateNaissance :string;
  private role : string;
  private idmodif: number;
  private idsupp: number;
  private userselected: User;

  constructor(
    private userservice: UsersService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() : void {
    this.isLoaded = false;
    this.ListUsers = this.userservice.getListUsers()
    .pipe(finalize( () => this.isLoaded = true))
    
  }

  ajout() {
    this.userservice.getUser(this.email)
    .subscribe(  
      data => {
        if  (data != null) {  
          alert("email déjà en base")
        }else{
          const user = new User(0,'','','','','','','','');
          user.setNom(this.nom);
          user.setPrenom(this.prenom);
          user.setAdresse(this.adresse);
          user.setEmail(this.email);
          user.setTel(this.tel);
          user.setPassword(this.password);
          user.setDateNaissance(this.dateNaissance);
          user.setRole(this.role);
          this.userservice.postUser(user)
          .subscribe(
            (data) => {
              this.getListUsers();
            },
            error => {
              console.log("Erreur lors de l'ajout de l'utilisateur", error);
            }
          ); 
        } 
      },
    error => console.log(error)
  )
     
  }

  modifier() {
    const user = new User(0,'','','','','','','','');
    user.setId(this.idmodif);
    user.setNom(this.nom);
    user.setPrenom(this.prenom);
    user.setAdresse(this.adresse);
    user.setEmail(this.email);
    user.setTel(this.tel);
    user.setPassword(this.password);
    user.setDateNaissance(this.dateNaissance);
    user.setRole(this.role);
    this.userservice.putUser(user);
  }

  supprimer() {
    this.userservice.deleteUser(this.idsupp)
    .subscribe(
      (data) => {
        this.getListUsers();
      },
      error => {
        console.log("Erreur lors de la suppression de l'utilisateur", error);
      }
    );
  }

  select(userselected: User){
    this.userselected=userselected;
    this.idmodif = userselected['id'];
    this.nom = userselected['nom'];
    this.prenom = userselected['prenom'];
    this.adresse = userselected['adresse'];
    this.email = userselected['email'];
    this.password = userselected['password'];
    this.role = userselected['role'];
    this.tel = userselected['tel'];
    this.dateNaissance = userselected['dateNaissance'];
  }

}
