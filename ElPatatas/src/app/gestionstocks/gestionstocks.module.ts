import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionstocksComponent } from './components/gestionstocks/gestionstocks.component';
import { CoreModule } from '../core/core-module.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
    GestionstocksComponent
  ]
})
export class GestionstocksModule { }
