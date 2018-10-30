import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ComptabiliteComponent } from './components/comptabilite.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'compta',
        pathMatch: 'full'
    },
    {
        path: 'compta',
        component: ComptabiliteComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComptabiliteRoutingModule { } 
