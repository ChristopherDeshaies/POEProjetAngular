import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Produits } from '../../models/produits';
import { ProduitsService } from '../../services/produits.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {
  private listProduits: Observable<Produits[]>;
  private isLoaded: boolean;
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
  private userselected: Produits;


  constructor(private produitsservice: ProduitsService) { }

  ngOnInit() {
    this.getListProduits();
  }

  getListProduits(): void {
    this.isLoaded = false;
    this.listProduits = this.produitsservice.getListProduits().pipe(finalize( () => this.isLoaded = true));
  }

  ajout() {
    
  }

  modifier() {
    
  }

  supprimer() {
    
  }

  select(){
    
  }

}
