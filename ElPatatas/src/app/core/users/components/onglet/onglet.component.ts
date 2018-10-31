import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onglet',
  templateUrl: './onglet.component.html',
  styleUrls: ['./onglet.component.css']
})
export class OngletComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }

  navigateCompta() {
    this.router.navigate(['/comptabilite']);
  }

  navigateStocks() {
    this.router.navigate(['/stocks']);
  }

  navigateEmployes() {
    this.router.navigate(['/employes']);
  }

  navigateCommandes() {
    this.router.navigate(['/commandes']);
  }

}
