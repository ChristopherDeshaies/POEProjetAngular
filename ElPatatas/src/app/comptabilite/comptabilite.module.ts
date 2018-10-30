import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComptabiliteComponent } from './components/comptabilite.component';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ComptabiliteRoutingModule
  ],
  declarations: [
    ComptabiliteComponent
  ],
  exports: [
    ComptabiliteComponent,
    RouterModule
  ]
})
export class ComptabiliteModule { }
