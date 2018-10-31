import { Component, OnInit } from '@angular/core';
import { CommandesComponent } from '../../commandes/components/commandes.component';
import { Observable } from 'rxjs';
import { Produits } from '../../core/produits/models/produits';
import { Commandes } from '../../commandes/models/commandes';
import { ComptabiliteService } from '../services/comptabilite.service';
import { finalize } from 'rxjs/operators';
import { CommandesService } from '../../commandes/services/commandes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
  /* TODO tableau des gains et pertes */
  private bilan: Observable<Commandes[]>;
  private achat: Observable<Produits[]>;
  private vente: Observable<Produits[]>;
  private histoCommandes: Observable<Commandes[]>;
  private isLoaded: boolean;

  constructor(
    private comptabiliteservice: ComptabiliteService, 
    private commandesServices: CommandesService,
    private router:Router
    // private commandes: Commandes
    ) { }
  /**
   *
   */
  ngOnInit() {

  }
  /**
   *
   */
   /* getBilan() {
    this.isLoaded = false;
    return this.bilan = this.commandes.getPrixTotal().pipe(finalize( () => this.isLoaded = true));
  } */
  /**
   *
   */
  /* getAchat() {
    this.isLoaded = false;
    return this.achat = this.comptabiliteservice.getAchat().pipe(finalize( () => this.isLoaded = true));
  } */
  /**
   *
   */
  /* getVente() {
    this.isLoaded = false;
    return this.vente = this.comptabiliteservice.getVente().pipe(finalize( () => this.isLoaded = true));
  } */
  /**
   *
   */
  getHistoriqueCommandes() {
    this.isLoaded = false;
    // this.bilan = this.comptabiliteservice.getPrixtotal().pipe(finalize( () => this.isLoaded = true));
  }
  getAchat() {
    this.isLoaded = false;
    // this.achat = this.comptabiliteservice.getAchat().pipe(finalize( () => this.isLoaded = true));
  }
  getVente() {
    this.isLoaded = false;
    // this.vente = this.comptabiliteservice.getVente().pipe(finalize( () => this.isLoaded = true));
  }
  
}
