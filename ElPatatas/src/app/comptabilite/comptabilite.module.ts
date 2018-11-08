import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComptabiliteComponent } from './components/comptabilite.component';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms'
=======
import { FormsModule } from '@angular/forms';
>>>>>>> c8c38b654f1a07eeb6ca98c25bb25f5b009ca90e


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
