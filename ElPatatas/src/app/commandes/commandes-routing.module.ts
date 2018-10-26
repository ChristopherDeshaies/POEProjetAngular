import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandesComponent } from './components/commandes.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'commandes',
        pathMatch: 'full'
    },
    {
        path: 'commandes',
        component: CommandesComponent,
        // children: [
        //     { path: '', component: ****** }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommandesRoutingModule { }