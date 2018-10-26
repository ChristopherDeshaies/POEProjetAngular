import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesComponent } from './components/commandes.component';
import { CommandesRoutingModule } from './commandes-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core-module.module';

@NgModule({
  imports: [
    CommonModule,
    CommandesRoutingModule,
    ReactiveFormsModule,
    FormsModule
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
