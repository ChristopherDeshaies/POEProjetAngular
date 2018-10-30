import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core-module.module';
import { PlanningComponent } from './planning/components/planning.component';
import { GestionstocksComponent } from './gestionstocks/components/gestionstocks/gestionstocks.component';
<<<<<<< HEAD
=======
import { OrderByPipe } from './shared/pipe/orderby';
import { UniquePipe } from './shared/pipe/unique';
import { ProduitsSearchPipe } from './shared/pipe/search';
import { SumPipe } from './shared/pipe/sum';
>>>>>>> 10e895e38d096dac89cd8912619001533525838f

@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
<<<<<<< HEAD
    GestionstocksComponent,
=======
    ComptabiliteComponent,
    GestionstocksComponent,
    OrderByPipe,
    UniquePipe,
    ProduitsSearchPipe,
    SumPipe
>>>>>>> 10e895e38d096dac89cd8912619001533525838f
  ],
  imports: [
    CoreModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
