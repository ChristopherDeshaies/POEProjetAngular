import {Pipe, PipeTransform} from '@angular/core';

/**
 * @author Christopher Deshaies
 */
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(array, keyfilter, valuefilter): any {

        if(array===null){
            return null;
        }

        return array.filter(
            (element) => element[keyfilter]===valuefilter && element.quantiteRestante>0
        );
    }
}