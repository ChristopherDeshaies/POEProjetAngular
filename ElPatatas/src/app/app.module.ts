import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core-module.module';
import { PlanningComponent } from './planning/components/planning.component';
import { GestionstocksComponent } from './gestionstocks/components/gestionstocks/gestionstocks.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    GestionstocksComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
