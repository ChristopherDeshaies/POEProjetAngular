import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionstocksComponent } from './components/gestionstocks/gestionstocks.component';
import { CoreModule } from '../core/core-module.module';
import { GestionStocksRoutingModule } from './gestionstocks-routing.module';
import { RouterModule } from '@angular/router';
import { OrderByPipe } from '../shared/pipe/pipe-orderby';
import { UniquePipe } from '../shared/pipe/pipe-unique';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../shared/pipe/pipe-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GestionStocksRoutingModule,
  ],
  declarations: [
    GestionstocksComponent, 
    OrderByPipe,
    UniquePipe,
    FilterPipe
  ],
  exports: [
    GestionstocksComponent,
    RouterModule,
    OrderByPipe,
    UniquePipe,
    FilterPipe
  ]
})
export class GestionstocksModule { }
