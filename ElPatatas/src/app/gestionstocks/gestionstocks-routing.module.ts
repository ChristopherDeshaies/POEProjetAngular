import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { GestionstocksComponent } from './components/gestionstocks/gestionstocks.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'stocks',
        pathMatch: 'full'
    },
    {
        path: 'stocks',
        component: GestionstocksComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionStocksRoutingModule { } 