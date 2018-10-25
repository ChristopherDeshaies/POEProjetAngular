import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core-module.module';
import { LoginComponent } from './core/users/components/login/login.component';
import { AdminComponent } from './core/users/components/admin/admin.component';
import { EmployesComponent } from './core/users/components/employes/employes.component';
import { PlanningComponent } from './planning/components/planning.component';
import { ComptabiliteComponent } from './comptabilite/components/comptabilite.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EmployesComponent,
    PlanningComponent,
    ComptabiliteComponent
  ],
  imports: [
    CoreModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
