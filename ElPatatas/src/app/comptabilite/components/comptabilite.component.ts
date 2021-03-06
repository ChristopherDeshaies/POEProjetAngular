import { Component, OnInit, Input } from '@angular/core';
import { CommandesComponent } from '../../commandes/components/commandes.component';
import { Observable } from 'rxjs';
import { Produits } from '../../core/produits/models/produits';
import { Commandes } from '../../commandes/models/commandes';
import { ComptabiliteService } from '../services/comptabilite.service';
import { finalize, map } from 'rxjs/operators';
import { CommandesService } from '../../commandes/services/commandes.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';


@Component({
 selector: 'app-comptabilite',
 templateUrl: './comptabilite.component.html',
 styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
  /* TODO tableau des gains et pertes */
  bilan: Observable<Commandes[]>;
  private achat: Observable<Produits[]>;
  private vente: Observable<Produits[]>;
  histoCommandes: Observable<Commandes[]>;
  private isLoaded: boolean;
  resultRecherche: number;
  

  constructor(
    private comptabiliteservice: ComptabiliteService, 
    private commandesServices: CommandesService,
    private router:Router
    // private commandes: Commandes
    ) { this.resultRecherche=0 }
    @Input() dateDebut: Date;
    @Input() dateFin: Date;
  /**
   *
   */
  ngOnInit() {

  }

    calcul(prixtotal :number) : number {
    if(prixtotal == undefined) return 0;
    if(prixtotal == null) return 0;
    //this.resultRecherche += parseInt(prixtotal.toString()); 
    return this.resultRecherche;
  }   
  
  rechercheCA(dateDebut: Date, dateFin: Date) {
    console.log(this.dateDebut);
    console.log(this.dateFin); 
    this.resultRecherche= 0; 
    this.histoCommandes= this.commandesServices.getListCommandes();
    this.histoCommandes.subscribe(
      (data) => {
            let dcde :Date;
            let ddeb :Date;
            let dfin :Date;
            ddeb = new Date(this.dateDebut);
            dfin = new Date(this.dateFin);

            console.log(data.length);           
            data.forEach((cde: Commandes) => { console.log(cde.prixTotal)
               dcde = new Date(cde.dateCommande);
              if ((dcde.getTime() >= ddeb.getTime()) && (dcde.getTime() <= dfin.getTime())){              
                parseInt(cde.prixTotal.toString());
                this.resultRecherche +=  parseInt(cde.prixTotal.toString());
                console.log("dans le if"); 
              }          
            })          
      }
    )
    return this.resultRecherche;
   /*  .pipe(
      map(
        (commandes: Commandes[]) => commandes
      )
    ) */
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
}