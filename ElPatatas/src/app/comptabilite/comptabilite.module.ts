import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComptabiliteComponent } from './components/comptabilite.component';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ComptabiliteRoutingModule,
    FormsModule
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
