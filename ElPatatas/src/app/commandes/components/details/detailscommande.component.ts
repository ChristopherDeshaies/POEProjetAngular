import { Component, OnInit, Input } from '@angular/core';
import { ItemMenu } from '../../models/itemmenu';

@Component({
  selector: 'app-detailscommande',
  templateUrl: './detailscommande.component.html',
  styleUrls: ['./detailscommande.component.css']
})
export class DetailscommandeComponent implements OnInit {

  @Input()
  produitsCommandes :  ItemMenu[];
  
  @Input()
  prixTotal :number;

  constructor() { }

  ngOnInit() {
  }

}
