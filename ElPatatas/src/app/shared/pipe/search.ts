import {Pipe, PipeTransform } from '@angular/core';
import { Produits } from 'src/app/core/produits/models/produits';

@Pipe({
    name: 'produitsSearch'
})
export class ProduitsSearchPipe implements PipeTransform {
    transform(items: Array<Produits>, libelleSearch: string){
        if (items && items.length){
            return items.filter(item =>{
                if (libelleSearch && item.libelle.toLowerCase().indexOf(libelleSearch.toLowerCase()) === -1 || item.quantiteRestante===0){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}