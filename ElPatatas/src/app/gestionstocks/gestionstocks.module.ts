import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionstocksComponent } from './components/gestionstocks/gestionstocks.component';
import { CoreModule } from '../core/core-module.module';
import { GestionStocksRoutingModule } from './gestionstocks-routing.module';
import { RouterModule } from '@angular/router';
import { OrderByPipe } from '../shared/pipe/orderby';
import { UniquePipe } from '../shared/pipe/unique';
import { ProduitsSearchPipe } from '../shared/pipe/search';
import { SumPipe } from '../shared/pipe/sum';
import { FormsModule } from '@angular/forms';

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
    ProduitsSearchPipe,
    SumPipe,
  ],
  exports: [
    GestionstocksComponent,
    RouterModule,
    OrderByPipe,
    UniquePipe,
    ProduitsSearchPipe,
    SumPipe,
  ]
})
export class GestionstocksModule { }
