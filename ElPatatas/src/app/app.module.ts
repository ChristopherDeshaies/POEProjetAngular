import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core-module.module';
import { HeaderComponent } from './core/header/components/header.component';
import { PipeFiltreDatesPipe } from './shared/pipe/filtre-dates.pipe';


@NgModule({
  declarations: [
    AppComponent,
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
