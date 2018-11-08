import { Pipe, PipeTransform } from '@angular/core';
import { Commandes } from 'src/app/commandes/models/commandes';
import { Observable } from 'rxjs';
import { Produits } from 'src/app/core/produits/models/produits';


@Pipe({
  name: 'pipeFiltreDates'
})
export class PipeFiltreDatesPipe implements PipeTransform {
  commandesService: any;
  commandefiltrees: any;

  transform(array, orderBy, asc=true){
    console.log("ici");
   array.forEach(Commandes => {
     
   });
  }
}