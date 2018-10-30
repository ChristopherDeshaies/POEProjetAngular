import { Component, OnInit } from '@angular/core';
import { Commandes } from 'src/app/commandes/models/commandes';
import { Observable } from 'rxjs';
import { Produits } from 'src/app/core/produits/models/produits';
import { ComptabiliteService } from '../services/comptabilite.service';
import { finalize } from 'rxjs/operators';


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

  constructor(private comptabiliteservice: ComptabiliteService) { }

  ngOnInit() {

  }
  getBilan() {
    this.isLoaded = false;
    this.bilan = this.comptabiliteservice.getPrixtotal().pipe(finalize( () => this.isLoaded = true));
  }
  getAchat() {
    this.isLoaded = false;
    this.achat = this.comptabiliteservice.getAchat().pipe(finalize( () => this.isLoaded = true));
  }
  getVente() {
    this.isLoaded = false;
    this.vente = this.comptabiliteservice.getVente().pipe(finalize( () => this.isLoaded = true));
  }
  getHistoriqueCommandes() {
    this.isLoaded = false;
    this.histoCommandes = this.histoCommandes.getHistoCommandes().pipe(finalize( () => this.isLoaded = true));
  }

}
