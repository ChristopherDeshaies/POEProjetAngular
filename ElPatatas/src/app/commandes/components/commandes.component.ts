import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '../models/itemmenu';
import { Commandes } from '../models/commandes';
import { CommandesService } from '../services/commandes.service'


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  selectedFritesIds = new Map();
  selectedBoissonsIds = new Map();
  selectedViandesIds = new Map();

  frites : ItemMenu[] ;
  boissons : ItemMenu[];
  viandes : ItemMenu[] ;

  commande : Commandes;
  listProduits: Map<string, number>;
  commandes : Array<Commandes>;

  date : string;

  /* à implémenter plus tard */
  // prixFrites :number =0;
  // prixBoissons :number =0;
  // prixViandes :number =0;
  prixTotal :number =0;

  constructor(private commandesService : CommandesService) {
  
  }

  ngOnInit() {

    this.frites = [];
    this.boissons = [];
    this.viandes = [];
    this.commandes = new Array<Commandes>();
    
    this.selectedFritesIds
    .set("Grande Frite", 0)
    .set("Moyenne Frite", 0)
    .set("Petite Frite", 0);

    this.selectedBoissonsIds
    .set("coca", 0)
    .set("pepsi", 0)
    .set("fanta", 0);

    this.selectedViandesIds
    .set("Steack", 0)
    .set("Fricadelle", 0)
    .set("Brochette", 0); 

    this.frites = [
      new ItemMenu(1,"Grande",0, 4),
      new ItemMenu(1,"Moyenne",0, 2.5),
      new ItemMenu(1,"Petite",0, 1.5)
    ];

    this.boissons = [
      new ItemMenu(1,"coca",0, 1),
      new ItemMenu(1,"pepsi",0, 1),
      new ItemMenu(1,"fanta",0, 1)
    ];

    this.viandes = [
      new ItemMenu(1,"steak",0, 4),
      new ItemMenu(1,"fricadelle",0, 3),
      new ItemMenu(1,"merguez",0, 3.5)
    ];
  
    this.listProduits = new Map();
    this.commande = new Commandes('',null,null);
  }

  reinitialiser(){

    this.prixTotal=0;
  
    this.frites = [
      new ItemMenu(1,"Grande",0, 4),
      new ItemMenu(1,"Moyenne",0, 2.5),
      new ItemMenu(1,"Petite",0, 1.5)
    ];

    this.boissons = [
      new ItemMenu(1,"coca",0, 1),
      new ItemMenu(1,"pepsi",0, 1),
      new ItemMenu(1,"fanta",0, 1)
    ];

    this.viandes = [
      new ItemMenu(1,"steak",0, 4),
      new ItemMenu(1,"fricadelle",0, 3),
      new ItemMenu(1,"merguez",0, 3.5)
    ];

    this.listProduits = new Map();
    this.commande = new Commandes('',null,null);

  }

  submit() {
       
  }

  select(produit: ItemMenu){
    produit.setQuantite(produit.getQuantite()+1);   
  }

  ajout(produit: ItemMenu){
    produit.setQuantite(produit.getQuantite()+1);
    this.ajouterPrix(produit);    
    this.listProduits.set(produit.getNom(), produit.getQuantite());
  }

  retirer(produit: ItemMenu){
    if (produit.getQuantite()>0){
      produit.setQuantite(produit.getQuantite()-1);
      this.retirerPrix(produit);
      this.listProduits.set(produit.getNom(), produit.getQuantite());
    }
  }

  ajouterPrix(produit : ItemMenu){
    this.prixTotal += produit.getPrix();
  }

  retirerPrix(produit : ItemMenu){
    this.prixTotal -= produit.getPrix();
  }

  encaisser(){
    if (this.prixTotal != 0){

      this.date = new Date().toUTCString();
      this.commande = new Commandes(this.date,JSON.stringify(this.strMapToTab(this.listProduits)),this.prixTotal);
      this.commandes.push(this.commande);
      this.commandesService.postCommande(this.commande);
      this.reinitialiser();

    }
  }

  strMapToTab(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = obj[v];
    }
    return obj;
}

}