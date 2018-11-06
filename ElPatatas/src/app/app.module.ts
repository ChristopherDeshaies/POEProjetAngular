import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core-module.module';
import { PlanningComponent } from './planning/components/planning.component';
import { GestionstocksComponent } from './gestionstocks/components/gestionstocks/gestionstocks.component';
import { HeaderComponent } from './core/header/components/header.component';
import { PipeFiltreDatesPipe } from './pipe-filtre-dates.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    HeaderComponent,
    PipeFiltreDatesPipe,
  ],
  imports: [
    CoreModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
