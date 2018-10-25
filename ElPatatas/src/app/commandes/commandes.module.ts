import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesComponent } from './components/commandes.component';
import { CommandesRoutingModule } from './commandes-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CommandesRoutingModule
  ],
  declarations: [
    CommandesComponent
  ],
  exports: [
    CommandesComponent,
    RouterModule
  ]
})
export class CommandesModule { }
