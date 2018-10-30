import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
    private userservice: UsersService
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
    const user = new User(0,'','','','','','','','');
    user.setNom(this.nom);
    user.setPrenom(this.prenom);
    user.setAdresse(this.adresse);
    user.setEmail(this.email);
    user.setTel(this.tel);
    user.setPassword(this.password);
    user.setDateNaissance(this.dateNaissance);
    user.setRole(this.role);
    this.userservice.postUser(user); 
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
    this.userservice.deleteUser(this.idsupp);
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
