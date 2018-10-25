import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposentComponent } from './composent/composent.component';
import { ComponentsComponent } from './components/components.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComposentComponent, ComponentsComponent]
})
export class ComptabiliteModule { }
