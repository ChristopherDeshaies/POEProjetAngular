import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanningComponent } from './components/planning.component';
import { FormsModule } from '@angular/forms';
import { PlanningRoutingModule } from './planning-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlanningRoutingModule,
  ],
  exports: [
    PlanningComponent,
    RouterModule
  ],
  declarations: [
    PlanningComponent
  ]
})
export class PlanningModule { }
