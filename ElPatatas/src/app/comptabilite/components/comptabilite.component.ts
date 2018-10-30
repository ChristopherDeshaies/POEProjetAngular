import { Component, OnInit } from '@angular/core';
import { CommandesComponent } from '../../commandes/components/commandes.component';
import { Observable } from 'rxjs';
import { Produits } from '../../core/produits/models/produits';
import { Commandes } from '../../commandes/models/commandes';
import { ComptabiliteService } from '../services/comptabilite.service';
import { finalize } from 'rxjs/operators';
import { CommandesService } from '../../commandes/services/commandes.service';


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

  constructor(private comptabiliteservice: ComptabiliteService, private commandesServices: CommandesService,
     private commandes: Commandes) { }
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
<<<<<<< HEAD
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
    return this.histoCommandes = this.commandesServices.getListCommandes().pipe(finalize( () => this.isLoaded = true));
=======
  // this.bilan = this.comptabiliteservice.getPrixtotal().pipe(finalize( () => this.isLoaded = true));
  }
  getAchat() {
    this.isLoaded = false;
    //this.achat = this.comptabiliteservice.getAchat().pipe(finalize( () => this.isLoaded = true));
  }
  getVente() {
    this.isLoaded = false;
    //this.vente = this.comptabiliteservice.getVente().pipe(finalize( () => this.isLoaded = true));
  }
  getHistoriqueCommandes() {
    this.isLoaded = false;
    //this.histoCommandes = this.histoCommandes.getHistoCommandes().pipe(finalize( () => this.isLoaded = true));
>>>>>>> 10e895e38d096dac89cd8912619001533525838f
  }

}
