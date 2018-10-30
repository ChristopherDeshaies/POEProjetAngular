import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core-module.module';
import { PlanningComponent } from './planning/components/planning.component';
import { GestionstocksComponent } from './gestionstocks/components/gestionstocks/gestionstocks.component';

import { HeaderComponent } from './core/header/components/header.component';

import { OrderByPipe } from './shared/pipe/orderby';
import { UniquePipe } from './shared/pipe/unique';
import { ProduitsSearchPipe } from './shared/pipe/search';
import { SumPipe } from './shared/pipe/sum';


@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    GestionstocksComponent,
    OrderByPipe,
    UniquePipe,
    ProduitsSearchPipe,
    SumPipe,
    HeaderComponent
  ],
  imports: [
    CoreModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
